using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace fabricasw.camara.usuario.api
{
    public static class UsuarioFactory
    {
        private static readonly string Secret = "43e4dbf0-52ed-4203-895d-42b586496bd4";

        public static UsuarioVM ModelToView(this Usuario model)
        {
            if (model == null)
                return null;

            var viewModel = new UsuarioVM()
            {
                Id = model.Id,
                Nome = model.Nome,
                Fone = model.Fone,
                Email = model.Email,
                Login = model.Login,
                Senha = model.Senha,
                Ativo = model.Ativo,
                Id_funcao = model.Id_funcao
            };

            return viewModel;
        }        

        public static Usuario ObjToModel(this ObjetoVM obj)
        {
            if (obj == null)
                return null;

            var model = new Usuario()
            {
                Id = obj.Id,
                Nome = obj.Nome,
                Fone = obj.Fone,
                Email = obj.Email,
                Login = obj.Login,
                Senha = obj.Senha,
                Ativo = obj.Ativo,
                Id_funcao = obj.Id_funcao
            };

            return model;
        }

        public static List<UsuarioVM> ToListView(this List<Usuario> models)
        {
            List<UsuarioVM> views = new List<UsuarioVM>();
            if (models == null)
                return views;

            foreach (var model in models)           
                views.Add(model.ModelToView());

            return views;
        }

        public static UsuarioVM ReaderToView(this MySqlDataReader reader)
        {
            UsuarioVM view = null;
            if (reader == null)
                return view;
            else
            {
                view = new UsuarioVM
                {
                    Id = reader.GetInt32(0),
                    Nome = reader.GetString(1),
                    Fone = reader.GetString(2),
                    Email = reader.GetString(3),
                    Login = reader.GetString(4),
                    Senha = reader.GetString(5),
                    Ativo = reader.GetString(6),
                    Id_funcao = reader.GetInt32(7),
                    Funcao = reader.GetString(8)
                };
            }

            return view;
        }

        public static Usuario ViewToModel(this UsuarioVM view)
        {
            if (view == null)
                return null;

            var model = new Usuario()
            {
                Id = view.Id,
                Nome = view.Nome,
                Fone = view.Fone,
                Email = view.Email,
                Login = view.Login,
                Senha = view.Senha,
                Ativo = view.Ativo,
                Id_funcao = view.Id_funcao
            };

            return model;
        }

        public static string ToToken(string data)
        {
            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Secret);
            var descriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, data)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var json = handler.CreateToken(descriptor);
            string token = handler.WriteToken(json);
            return token;
        }

        public static AuthVM TokenToAuth(this UsuarioVM user)
        {
            if (user == null)
                return null;

            AuthVM auth = new AuthVM()
            {
                Identity = user.Id.ToString(),
                Function = user.Id_funcao.ToString(),
                Token = ToToken(user.Id.ToString())
            };

            return auth;
        }

        public static TokenVM ViewToToken(this UsuarioVM view)
        {
            if (view == null)
                return null;

            var token = new TokenVM()
            {
                Id = view.Id,
                Nome = view.Nome,
                Fone = view.Fone,
                Email = view.Email,
                Login = view.Login,
                Senha = view.Senha,
                Ativo = view.Ativo,
                Id_funcao = view.Id_funcao,
                Funcao = view.Funcao,
                Token = ToToken(view.Id.ToString())
            };

            return token;
        }


    }
}
