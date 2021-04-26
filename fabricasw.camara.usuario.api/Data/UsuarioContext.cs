using Microsoft.EntityFrameworkCore;

namespace fabricasw.camara.usuario.api
{
    public class UsuarioContext : DbContext
    {               
        public UsuarioContext() { }

        public UsuarioContext(DbContextOptions<UsuarioContext> options) : base(options){}

        public DbSet<UsuarioVM> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>().ToTable("usuario");
            modelBuilder.Entity<Usuario>().HasKey(c => c.Id);
            modelBuilder.Entity<Usuario>().Property(c => c.Id).HasColumnName("id").HasColumnType("INT");
            modelBuilder.Entity<Usuario>().Property(c => c.Nome).HasColumnName("nome");
            modelBuilder.Entity<Usuario>().Property(c => c.Fone).HasColumnName("fone");
            modelBuilder.Entity<Usuario>().Property(c => c.Email).HasColumnName("email");
            modelBuilder.Entity<Usuario>().Property(c => c.Login).HasColumnName("login");            
            modelBuilder.Entity<Usuario>().Property(c => c.Senha).HasColumnName("senha");
            modelBuilder.Entity<Usuario>().Property(c => c.Ativo).HasColumnName("ativo").HasDefaultValue("S");
            modelBuilder.Entity<Usuario>().Property(c => c.Id_funcao).HasColumnName("id_funcao").HasColumnType("INT");

            modelBuilder.Entity<UsuarioVM>().ToTable("vw_usuario");
            modelBuilder.Entity<UsuarioVM>().HasKey(c => c.Id);
            modelBuilder.Entity<UsuarioVM>().Property(c => c.Id).HasColumnName("id").HasColumnType("INT");
            modelBuilder.Entity<UsuarioVM>().Property(c => c.Nome).HasColumnName("nome");
            modelBuilder.Entity<UsuarioVM>().Property(c => c.Fone).HasColumnName("fone");
            modelBuilder.Entity<UsuarioVM>().Property(c => c.Email).HasColumnName("email");
            modelBuilder.Entity<UsuarioVM>().Property(c => c.Login).HasColumnName("login");
            modelBuilder.Entity<UsuarioVM>().Property(c => c.Senha).HasColumnName("senha");
            modelBuilder.Entity<UsuarioVM>().Property(c => c.Ativo).HasColumnName("ativo");
            modelBuilder.Entity<UsuarioVM>().Property(c => c.Id_funcao).HasColumnName("id_funcao").HasColumnType("INT");
            modelBuilder.Entity<UsuarioVM>().Property(c => c.Funcao).HasColumnName("funcao");

            base.OnModelCreating(modelBuilder);
        }
    }
}
