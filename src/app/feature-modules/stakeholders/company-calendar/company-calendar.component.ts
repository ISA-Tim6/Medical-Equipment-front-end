import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import { CompanyCalendar } from '../model/company-calendar.model';
import { StakeholdersService } from '../stakeholders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../company-profile/model/company.model';
import { formatDate } from '@angular/common';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CompanyAdmin } from '../model/company-admin.model';

@Component({
  selector: 'app-company-calendar',
  templateUrl: './company-calendar.component.html',
  styleUrls: ['./company-calendar.component.css']
})
export class CompanyCalendarComponent {
  @ViewChild(FullCalendarComponent) calendar: FullCalendarComponent;
  companyAdmin:CompanyAdmin;
  company_id:number;
  companyCalendar: CompanyCalendar;
  company: Company;
  openingHours: string = '';
  closingHours: string = '';
  Events: any[] = [];
  businessHours: any[] = [];
  activeView: string = 'dayGridMonth';
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    firstDay: 1,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,dayGridYear',
    },
    businessHours: true,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
  };
  constructor(private httpClient: HttpClient,private router: Router, private service: StakeholdersService, private activatedRoute: ActivatedRoute) {}
  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }
  ngOnInit() {

    this.service.getCompanyAdmin().subscribe({
      next: (result: CompanyAdmin) => {
        console.log(result);
        this.companyAdmin=result;
        this.company_id=this.companyAdmin.company_id;

        if(this.companyAdmin.loggedBefore==false){
          this.router.navigate([`company-admin-password/${this.companyAdmin.id}`]);
        }

        this.service.getCompanyCalendar(this.company_id).subscribe(result => {
          this.companyCalendar = result;
          this.createAvailableAppointments();
          });
    
          this.service.getCompany(this.company_id).subscribe(result => {
            this.company = result;
            this.openingHours = this.company.openingHours.toString().replace(',', ':');
            if((this.openingHours.split(':')[0]).length == 1)
              this.openingHours = '0'.concat(this.openingHours);
            if((this.openingHours.split(':')[1]).length == 1)
              this.openingHours = this.openingHours.split(':')[0] + ':0' + this.openingHours.split(':')[1]; 
  
            this.closingHours = this.company.closingHours.toString().replace(',', ':');
  
            if((this.closingHours.split(':')[0]).length == 1)
              this.closingHours = '0'.concat(this.closingHours);
            if((this.closingHours.split(':')[1]).length == 1)
              this.closingHours = this.closingHours.split(':')[0] + ':0' + this.closingHours.split(':')[1]; 
  
            var b=  {
              // days of week. an array of zero-based day of week integers (0=Sunday)
              daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0 ], 
            
              startTime: this.openingHours, // a start time (10am in this example)
              endTime: this.closingHours, // an end time (6pm in this example)
            }
            this.businessHours.push(b);
            this.calendarOptions.businessHours = this.businessHours;
            });

      },
    });
    // setTimeout(() => {
    //   this.calendarOptions = {
    //     initialView: 'dayGridMonth',
    //     events: this.Events,
    //     dateClick: this.onDateClick.bind(this),
    //   };
    // }, 2500);

  /*  this.activatedRoute.params.subscribe(params=>{
      this.service.getCompanyCalendar(params['company_id']).subscribe(result => {
        this.companyCalendar = result;
        this.createAvailableAppointments();
        });

        this.service.getCompany(params['company_id']).subscribe(result => {
          this.company = result;
          this.openingHours = this.company.openingHours.toString().replace(',', ':');
          if((this.openingHours.split(':')[0]).length == 1)
            this.openingHours = '0'.concat(this.openingHours);
          if((this.openingHours.split(':')[1]).length == 1)
            this.openingHours = this.openingHours.split(':')[0] + ':0' + this.openingHours.split(':')[1]; 

          this.closingHours = this.company.closingHours.toString().replace(',', ':');

          if((this.closingHours.split(':')[0]).length == 1)
            this.closingHours = '0'.concat(this.closingHours);
          if((this.closingHours.split(':')[1]).length == 1)
            this.closingHours = this.closingHours.split(':')[0] + ':0' + this.closingHours.split(':')[1]; 

          var b=  {
            // days of week. an array of zero-based day of week integers (0=Sunday)
            daysOfWeek: [ 1, 2, 3, 4, 5, 6, 0 ], 
          
            startTime: this.openingHours, // a start time (10am in this example)
            endTime: this.closingHours, // an end time (6pm in this example)
          }
          this.businessHours.push(b);
          this.calendarOptions.businessHours = this.businessHours;
          });
    });*/

      setTimeout(() => {
       this.calendarOptions = {
         events: this.Events,
       };
     }, 2000);
  }


  createAvailableAppointments(): void{

    this.companyCalendar.workingTimeCalendarDto.appointments.forEach(a => {
      //var a = this.companyCalendar.workingTimeCalendarDto.appointments[0];
      var appointment_date = formatDate(a.date, 'yyyy-MM-dd', 'en-US').toString() + 'T' + this.formatTime(a.time, false);
      var appointment_end = formatDate(a.date, 'yyyy-MM-dd', 'en-US').toString() + 'T' + this.formatTime(a.time, true);
      
      var e = {
        title: a.admin?.username,
        //start: '2023-12-12T10:30:00',
        start: appointment_date.toString(),
        end: appointment_end.toString(),
        //end: '2023-12-12T11:30:00',
        rendering: 'background',
        color: '#257e4a',
        display: 'block',
        description: 'Free appointment'
      }
      if(a.appointmentStatus == 'AVAILABLE')
        this.Events.push(e);
    });

    this.companyCalendar.reservations.forEach(r => {
      //var a = this.companyCalendar.workingTimeCalendarDto.appointments[0];
      var appointment_date = formatDate(r.appointment.date, 'yyyy-MM-dd', 'en-US').toString() + 'T' + this.formatTime(r.appointment.time, false);
      var appointment_end = formatDate(r.appointment.date, 'yyyy-MM-dd', 'en-US').toString() + 'T' + this.formatTime(r.appointment.time, true);
      
      var e = {
        title: r.user.name.concat(' ').concat(r.user.surname),
        //start: '2023-12-12T10:30:00',
        start: appointment_date.toString(),
        end: appointment_end.toString(),
        //end: '2023-12-12T11:30:00',
        rendering: 'background',
        color: 'red',
        display: 'block',
        description: 'Reserved'
      }
      this.Events.push(e);
    });
  }

  formatTime(time: string, end: boolean): string {
    if(end)
      var hours = (time[0]+1).toString();
    else
    var hours = (time[0]).toString();
    var minutes = time[1].toString();
    var time = '';
    if (hours.length == 1)
      time = '0'+ hours.toString() + ':';
    else
    time = hours.toString() + ':';

    if (minutes.length == 1)
      time = time.concat('0'+ minutes.toString());
    else
      time = time.concat(minutes.toString());

    time = time.concat(':00');
    return time;
  }

}