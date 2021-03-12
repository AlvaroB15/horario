import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  horaInicio: any = {
    hour: 8,
    minute: 0
  };
  horaFinal: any = {
    hour: 14,
    minute: 0
  }
  totalHoras = 7;
  listaHoras: Array<any> = [];
  listaDias: Array<any> = [];

  horarios: Array<any> = [
    {
      "idAula": 1,
      "numeroAula": 1,
      "idCurso": 1,
      "nombreCurso": "Prog 1",
      "idArea": 6,
      "duracion_curso": 1,
      "diaSemana": "LUNES",
      "horaInicio": "08:00:00",
      "horaFin": "08:30:00"
    },
    {
      "idAula": 1,
      "numeroAula": 1,
      "idCurso": 2,
      "nombreCurso": "BD 1",
      "idArea": 9,
      "duracion_curso": 1,
      "diaSemana": "LUNES",
      "horaInicio": "09:45:00",
      "horaFin": "10:00:00"
    },
    {
      "idAula": 1,
      "numeroAula": 1,
      "idCurso": 3,
      "nombreCurso": "Filosofia",
      "idArea": 20,
      "duracion_curso": 1,
      "diaSemana": "MARTES",
      "horaInicio": "08:00:00",
      "horaFin": "08:20:00"
    },
    {
      "idAula": 1,
      "numeroAula": 1,
      "idCurso": 3,
      "nombreCurso": "Algebra",
      "idArea": 20,
      "duracion_curso": 1,
      "diaSemana": "VIERNES",
      "horaInicio": "10:00:00",
      "horaFin": "11:30:00"
    },
    {
      "idAula": 1,
      "numeroAula": 1,
      "idCurso": 3,
      "nombreCurso": "Filosofia",
      "idArea": 20,
      "duracion_curso": 1,
      "diaSemana": "JUEVES",
      "horaInicio": "10:00:00",
      "horaFin": "13:30:00"
    }
  ]

  dias = [
    'LUNES',
    'MARTES',
    'MIÉRCOLES',
    'JUEVES',
    'VIERNES',
    'SÁBADO',
    'DOMINGO'
  ]
  constructor() { }

  ngOnInit(): void {
    this.horarios = this.normalizarHorario(this.horarios);
    this.horarios = this.dividirHorarios(this.horarios);
    this.generarhoras();

    for (let index = 0; index < 7; index++) {
      const resp = this.filtroDiario(index);
      this.listaDias.push(resp);
    }
    console.log(this.listaDias);

  }

  generarhoras() {
    this.listaHoras.push(this.horaInicio);
    for (let index = 1; index < this.totalHoras - 1; index++) {
      const aux = {
        hour: this.horaInicio.hour + index,
        minute: 0
      }
      this.listaHoras.push(aux);
    }
    this.listaHoras.push(this.horaFinal);
  }

  filtroDiario(indexDia: number) {
    // const indexDia = 0;
    let minInt;
    let horarioAux;
    let listDiaAux: Array<any> = [];
    let auxItem: any;
    for (let index = 0; index < this.totalHoras; index++) {
      minInt = this.listaHoras[index].minute;
      let programation: Array<any> = [];
      horarioAux = this.horarios.filter(
        (e) => {
          return e.diaSemana === this.dias[indexDia] && e.horaInicio.hour === this.listaHoras[index].hour
        }
      )
      if (horarioAux.length === 0) {
        auxItem = {
          type: 0,
          volume: 1,
          item: null
        }
        programation.push(auxItem);
      } else {
        for (let e = 0; e < horarioAux.length; e++) {
          if (horarioAux[e].horaInicio.minute - minInt > 0) { // 30  - 20
            auxItem = {
              type: 0,
              volume: horarioAux[e].horaInicio.minute - minInt,
              item: null
            }
            programation.push(auxItem);
            auxItem = {
              type: 1,
              volume: (horarioAux[e].horaFin.minute === 0 ? 60 : horarioAux[e].horaFin.minute) - horarioAux[e].horaInicio.minute,
              item: horarioAux[e]
            }
            programation.push(auxItem);
          } else {
            let auxItem = {
              type: 1,
              volume: (horarioAux[e].horaFin.minute === 0 ? 60 : horarioAux[e].horaFin.minute) - horarioAux[e].horaInicio.minute,
              item: horarioAux[e]
            }
            programation.push(auxItem);
          }
          if (e === horarioAux.length - 1) {
            console.log('hola');
            if (horarioAux[e].horaFin.minute !== 0) {
              let auxItem = {
                type: 0,
                volume: 60 - horarioAux[e].horaFin.minute,
                item: null
              }
              programation.push(auxItem);
            }
          }
          minInt = this.horarios[e].horaFin.minute;
        }
      }
      // console.log(programation);
      listDiaAux.push({ programation: programation });
    }
    return listDiaAux;
  }



  normalizarHorario(horario: Array<any>) {
    horario.map((e) => {
      let auxInit = {
        hour: parseInt(e.horaInicio.slice(0, 2)),
        minute: parseInt(e.horaInicio.slice(3, 5))
      }
      e['horaInicio'] = auxInit;
      console.log(e.horaFin.slice(3, 5));

      auxInit = {
        hour: parseInt(e.horaFin.slice(0, 2)),
        minute: parseInt(e.horaFin.slice(3, 5))
      }
      console.log(auxInit);
      e['horaFin'] = auxInit;
    });
    return horario;
  }

  dividirHorarios(horario: Array<any>) {
    let horarioAux: Array<any> = [];
    for (let index = 0; index < horario.length; index++) {
      if (horario[index].horaInicio.hour === horario[index].horaFin.hour) {
        horarioAux.push(horario[index]);
      } else {
        if (horario[index].horaInicio.hour + 1 === horario[index].horaFin.hour && horario[index].horaFin.minute === 0) {
          console.log('exacto');
          horarioAux.push(horario[index]);
        } else {
          console.log('Agregar +');
          horarioAux = horarioAux.concat(this.crearHorarioAux(horario[index]))
        }
      }
    }
    console.log(horarioAux);
    return horarioAux;
  }

  crearHorarioAux(horario: any) {
    let horarioAux: Array<any> = [];
    // let item: any = JSON.parse(JSON.stringify(horario));
    for (let index = horario.horaInicio.hour; index <= horario.horaFin.hour; index++) {
      let item: any = JSON.parse(JSON.stringify(horario));
      if (index === horario.horaInicio.hour) {
        item.horaInicio.hour = index;
        item.horaInicio.minute = horario.horaInicio.minute;
        item.horaFin.hour = index + 1;
        item.horaFin.minute = 0;
        console.log('Inicio', item);
        horarioAux.push(item)
      } else {
        if (index === horario.horaFin.hour) {
          if (horario.horaFin.minute === 0) {
            item.horaInicio.hour = index - 1;
          } else {
            item.horaInicio.hour = index;
          }
          item.horaInicio.minute = 0;
          item.horaFin.hour = horario.horaFin.hour;
          item.horaFin.minute = horario.horaFin.minute;
          console.log('Fin', item);
          horarioAux.push(item)
        } else {
          if ((horario.horaFin.minute === 0 && index + 1 !== horario.horaFin.hour) || (horario.horaFin.minute !== 0)) {
            item.horaInicio.hour = index;
            item.horaInicio.minute = 0;
            item.horaFin.hour = index + 1;
            item.horaFin.minute = 0;
            horarioAux.push(item)
          }

        }
      }
      console.log(horarioAux);

    }
    return horarioAux;
  }


}
