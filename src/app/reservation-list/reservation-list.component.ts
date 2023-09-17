import { Component } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservations = this.reservationService.getReservations()
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id)
  }

  editReservation(reservation: Reservation) {
    // this.reservationService.updateReservation(reservation);
  }
}
