import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  showEdit = false;
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.reservationForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.showEdit = true;
      const foundReservation = this.reservationService.getReservation(id);
      if (foundReservation) {
        this.reservationForm.patchValue(foundReservation)
      }
    }
  }

  update() {
    const reservation = this.reservationForm.value;
    reservation.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.reservationService.updateReservation(reservation);
    this.router.navigate(['/list'])
  }

  get checkInDateField() {
    return this.reservationForm.get('checkInDate')!
  }

  get checkOutDateField() {
    return this.reservationForm.get('checkOutDate')!
  }

  get guestNameField() {
    return this.reservationForm.get('guestName')!
  }

  get guestEmailField() {
    return this.reservationForm.get('guestEmail')!
  }

  get roomNumberField() {
    return this.reservationForm.get('roomNumber')!
  }

  onSubmit() {
    this.reservationService.addReservation(this.reservationForm.value)
    this.reservationForm.reset()
    this.router.navigate(['/list'])
  }

}
