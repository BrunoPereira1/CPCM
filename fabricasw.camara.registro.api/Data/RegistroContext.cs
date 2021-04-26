using Microsoft.EntityFrameworkCore;

namespace fabricasw.camara.registro.api
{
    public class RegistroContext : DbContext
    {               
        public RegistroContext() { }

        public RegistroContext(DbContextOptions<RegistroContext> options) : base(options) { }

        public DbSet<RegistroVM> Registros { get; set; }
        public DbSet<Agenda> Agendas { get; set; }
        public DbSet<RegistroLog> RegistrosLog { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Registro>().ToTable("registro");
            modelBuilder.Entity<Registro>().HasKey(c => c.Id);
            modelBuilder.Entity<Registro>().Property(c => c.Id).HasColumnName("id").HasColumnType("INT");
            modelBuilder.Entity<Registro>().Property(c => c.Tipo).HasColumnName("tipo");
            modelBuilder.Entity<Registro>().Property(c => c.Assunto).HasColumnName("assunto");
            modelBuilder.Entity<Registro>().Property(c => c.Mensagem).HasColumnName("mensagem");
            modelBuilder.Entity<Registro>().Property(c => c.Nome).HasColumnName("nome");
            modelBuilder.Entity<Registro>().Property(c => c.Fone).HasColumnName("fone");
            modelBuilder.Entity<Registro>().Property(c => c.Email).HasColumnName("email");
            modelBuilder.Entity<Registro>().Property(c => c.Registrado_em).HasColumnName("registrado_em").HasColumnType("DATETIME");
            modelBuilder.Entity<Registro>().Property(c => c.Uu_Id).HasColumnName("uu_id");

            modelBuilder.Entity<RegistroVM>().ToTable("vw_registro");
            modelBuilder.Entity<RegistroVM>().HasKey(c => c.Id);
            modelBuilder.Entity<RegistroVM>().Property(c => c.Id).HasColumnName("id").HasColumnType("INT");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Tipo).HasColumnName("tipo");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Assunto).HasColumnName("assunto");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Mensagem).HasColumnName("mensagem");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Nome).HasColumnName("nome");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Fone).HasColumnName("fone");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Email).HasColumnName("email");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Registrado_em).HasColumnName("registrado_em").HasColumnType("DATETIME");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Status).HasColumnName("status");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Agenda_em).HasColumnName("agenda_em").HasColumnType("DATETIME");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Atualizado_em).HasColumnName("atualizado_em").HasColumnType("DATETIME");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Observacao).HasColumnName("observacao");
            modelBuilder.Entity<RegistroVM>().Property(c => c.Uu_Id).HasColumnName("uu_id");

            modelBuilder.Entity<Agenda>().ToTable("agenda");
            modelBuilder.Entity<Agenda>().HasKey(c => c.Id);
            modelBuilder.Entity<Agenda>().Property(c => c.Id).HasColumnName("id").HasColumnType("INT");
            modelBuilder.Entity<Agenda>().Property(c => c.Id_Registro).HasColumnName("id_registro").HasColumnType("INT");
            modelBuilder.Entity<Agenda>().Property(c => c.Status).HasColumnName("status");
            modelBuilder.Entity<Agenda>().Property(c => c.Datahora).HasColumnName("datahora").HasColumnType("DATETIME");
            modelBuilder.Entity<Agenda>().Property(c => c.Observacao).HasColumnName("observacao");
            modelBuilder.Entity<Agenda>().Property(c => c.Uu_Id).HasColumnName("uu_id");

            modelBuilder.Entity<RegistroLog>().ToTable("registro_log");
            modelBuilder.Entity<RegistroLog>().HasKey(c => c.Id);
            modelBuilder.Entity<RegistroLog>().Property(c => c.Id).HasColumnName("id").HasColumnType("INT");
            modelBuilder.Entity<RegistroLog>().Property(c => c.Id_registro).HasColumnName("id_registro").HasColumnType("INT");
            modelBuilder.Entity<RegistroLog>().Property(c => c.Id_usuario).HasColumnName("id_usuario").HasColumnType("INT");
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
