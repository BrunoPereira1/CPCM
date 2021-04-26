import React, { useState, useEffect } from "react";
import apiRegistro from "../../../services/ApiRegistro";

const DashboardContent = () => {
  var [values, setValues] = useState([]);

  function loadScript() {
    const script = document.createElement("script");

    script.src = "js/Dashboard.js";
    script.async = true;

    document.body.appendChild(script);
  }
  useEffect(() => {
    const fetchResult = async () => {
      const result = await apiRegistro.get("/Dashboard");
      let abertos = 0;
      let andamento = 0;
      let concluido = 0;
      let cancelado = 0;
      for (let i = 0; i < result.data[0].data.length; i++) {
        if (
          result.data[0].data[i].field === "ABERTO" ||
          result.data[0].data[i].field === "VERIFICADO"
        ) {
          abertos = abertos + result.data[0].data[i].count;
        } else if (
          result.data[0].data[i].field === "REALIZADO" ||
          result.data[0].data[i].field === "PROCESSADO"
        ) {
          andamento += result.data[0].data[i].count;
        } else if (result.data[0].data[i].field === "ENCERRADO") {
          concluido += result.data[0].data[i].count;
        } else if (result.data[0].data[i].field === "CANCELADO") {
          cancelado += result.data[0].data[i].count;
        } else {
          continue;
        }
      }
      setValues({
        aberto: abertos,
        andamento: andamento,
        concluido: concluido,
        cancelado: cancelado,
        total: result.data[0].count,
      });
    };
    fetchResult();
    loadScript();
  }, []);

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Dashboard</h1>
            </div>
            {/* /.col */}
            {/* <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div> */}
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Small boxes (Stat box) */}
          <div className="row">
            <div className="col-lg col-6">
              {/* small box */}
              <div className="small-box bg-gray">
                <div className="inner">
                  <h3>{values.total}</h3>
                  <p>Total</p>
                </div>
                <div className="icon">
                  <i className="fas fa-asterisk" /> {/*fas fa-database*/}
                </div>
                <a href="/NewSchedule" className="small-box-footer">
                  Criar novo agendamento{" "}
                  <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg col-6">
              {/* small box */}
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{values.aberto}</h3>
                  <p>Abertos</p>
                </div>
                <div className="icon">
                  <i className="far fa-calendar" />
                </div>
                <a href="/SchedulesOpen" className="small-box-footer">
                  Detalhes <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            <div className="col-lg col-6">
              {/* small box */}
              <div
                style={{ backgroundColor: "#ffc107", color: "white" }}
                className="small-box"
              >
                <div className="inner">
                  <h3>{values.andamento}</h3>
                  <p>Pendentes</p>
                </div>
                <div className="icon">
                  <i className="fas fa-spinner" />
                </div>
                <a href="/SchedulesPending" className="small-box-footer">
                  Detalhes <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
            <div className="col-lg col-6">
              {/* small box */}
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{values.concluido}</h3>
                  <p>Concluidos</p>
                </div>
                <div className="icon">
                  <i className="fas fa-check" />
                </div>
                <a href="/SchedulesComplete" className="small-box-footer">
                  Detalhes <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}

            {/* ./col */}
            <div className="col-lg col-6">
              {/* small box */}
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{values.cancelado}</h3>
                  <p>Cancelados</p>
                </div>
                <div className="icon">
                  <i className="fas fa-times" />
                </div>
                <a href="/SchedulesCancel" className="small-box-footer">
                  Detalhes <i className="fas fa-arrow-circle-right" />
                </a>
              </div>
            </div>
            {/* ./col */}
          </div>
          {/* /.row */}
          {/* Main row */}

          <div>
            {/* Content Header (Page header) */}

            {/* Main content */}
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    {/* DONUT CHART */}
                    <div className="card card-navy">
                      <div className="card-header">
                        <h3 className="card-title">Serviços</h3>
                        <div className="card-tools">
                          <button
                            type="button"
                            className="btn btn-tool"
                            data-card-widget="collapse"
                          >
                            <i className="fas fa-minus" />
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <canvas
                          id="donutChart"
                          style={{
                            minHeight: 250,
                            height: 250,
                            maxHeight: 250,
                            maxWidth: "100%",
                          }}
                        />
                      </div>
                      {/* /.card-body */}
                    </div>
                    {/* /.card */}

                    {/* AREA CHART */}
                    {/*
          <div className="card card-primary">
            <div className="card-header">
              <h3 className="card-title">Area Chart</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" /></button>
              </div>
            </div>
            <div className="card-body">
              <div className="chart">
                <canvas id="areaChart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} />
              </div>
            </div>
          </div>
          */}
                    {/* /.card */}
                  </div>
                  {/* /.col (LEFT) */}
                  <div className="col-md-6">
                    {/* PIE CHART */}
                    <div className="card card-navy">
                      <div className="card-header">
                        <h3 className="card-title">Status</h3>
                        <div className="card-tools">
                          <button
                            type="button"
                            className="btn btn-tool"
                            data-card-widget="collapse"
                          >
                            <i className="fas fa-minus" />
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        <canvas
                          id="pieChart"
                          style={{
                            minHeight: 250,
                            height: 250,
                            maxHeight: 250,
                            maxWidth: "100%",
                          }}
                        />
                      </div>
                      {/* /.card-body */}
                    </div>
                    {/* /.card */}

                    {/* BAR CHART */}
                    {/*
          <div className="card card-success">
            <div className="card-header">
              <h3 className="card-title">Bar Chart</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse"><i className="fas fa-minus" />
                </button>
                <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" /></button>
              </div>
            </div>
            <div className="card-body">
              <div className="chart">
                <canvas id="barChart" style={{minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%'}} />
              </div>
            </div>
            
          </div>
          */}
                    {/* /.card */}
                  </div>
                  {/* /.col (RIGHT) */}
                </div>
                {/* /.row */}
              </div>
              {/* /.container-fluid */}
            </section>
            {/* /.content */}
          </div>
          {/* /.row (main row) */}
        </div>
        {/* /.container-fluid */}
      </section>
      {/* /.content */}
    </div>
  );
};

export default DashboardContent;
