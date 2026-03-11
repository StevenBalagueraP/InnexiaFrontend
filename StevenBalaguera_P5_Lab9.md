## Activity 1:

### User Routes
[User Routes](https://gitlab.com/jala-university1/cohort-3/ES.CSPR-351.GA.T1.26.M1/SC/jerson.balaguera/innexiafrontend/-/blob/develop/src/app/features/user/user.routes.ts)

![](https://i.postimg.cc/90GXRdLR/Screenshot-from-2026-03-06-11-15-54.png)

### Booking Service
[Booking Service](https://gitlab.com/jala-university1/cohort-3/ES.CSPR-351.GA.T1.26.M1/SC/jerson.balaguera/innexiafrontend/-/blob/develop/src/app/core/services/booking.service.ts?ref_type=heads)

![](https://i.postimg.cc/PJqKNyfn/Screenshot-from-2026-03-06-11-21-12.png)

### Load User Bookings (Smart Component)
[User.ts](https://gitlab.com/jala-university1/cohort-3/ES.CSPR-351.GA.T1.26.M1/SC/jerson.balaguera/innexiafrontend/-/blob/develop/src/app/features/user/pages/user.ts?ref_type=heads)

![](https://i.postimg.cc/kgN8389R/Screenshot-from-2026-03-06-11-23-08.png)

### List of Bookings Looped (Dumb Component)
[BookingCardListComponent](https://gitlab.com/jala-university1/cohort-3/ES.CSPR-351.GA.T1.26.M1/SC/jerson.balaguera/innexiafrontend/-/blob/develop/src/app/shared/components/booking-card-list/booking-card-list.component.ts?ref_type=heads)

![](https://i.postimg.cc/sg3P2KTB/Screenshot-from-2026-03-06-11-25-38.png)

### Render (Dumb Component)
[BookingCardListComponent.html](https://gitlab.com/jala-university1/cohort-3/ES.CSPR-351.GA.T1.26.M1/SC/jerson.balaguera/innexiafrontend/-/blob/develop/src/app/shared/components/booking-card-list/booking-card-list.component.html?ref_type=heads)
![](https://i.postimg.cc/Y9FLRmXw/Screenshot-from-2026-03-06-11-26-32.png)

### CSS Styles 
![cssStyles](https://i.postimg.cc/QtN18MSM/Screenshot-from-2026-03-06-11-43-55.png)


## Activity 2:

![](https://i.postimg.cc/kXhfwsbf/Screenshot-from-2026-03-06-15-47-20.png)
![](https://i.postimg.cc/sXNvbM97/Screenshot-from-2026-03-06-15-53-14.png)

### Booking Card Component Styles

![](https://i.postimg.cc/HxXkv6nJ/Screenshot-from-2026-03-06-15-56-00.png)
![](https://i.postimg.cc/1XK5s4pX/Screenshot-from-2026-03-06-15-56-25.png)
![](https://i.postimg.cc/5tF4jswh/Screenshot-from-2026-03-06-15-56-35.png)
![](https://i.postimg.cc/VkJ1HKZZ/Screenshot-from-2026-03-06-15-56-39.png)
![](https://i.postimg.cc/J0TVpXNt/Screenshot-from-2026-03-06-15-56-46.png)


## Activity 3:
![](https://i.postimg.cc/LXHtmgPH/Screenshot-from-2026-03-06-15-50-03.png)
[Booking Service](https://gitlab.com/jala-university1/cohort-3/ES.CSPR-351.GA.T1.26.M1/SC/jerson.balaguera/innexiafrontend/-/blob/develop/src/app/core/services/booking.service.ts?ref_type=heads)
![](https://i.postimg.cc/4NTB0yLs/Screenshot-from-2026-03-06-16-03-48.png)

#### Cancelation Logic
![](https://i.postimg.cc/PJHYSpX5/Screenshot-from-2026-03-06-16-05-44.png)
![](https://i.postimg.cc/tCXFPxv3/Screenshot-from-2026-03-06-16-06-12.png)

> As you can see in the last image, the last booking is cancelled because the check-in date is more than 3 days after the current date. For that reason, the button is disabled and the cancellation was successfully completed.

[BOoking-card-component](https://gitlab.com/jala-university1/cohort-3/ES.CSPR-351.GA.T1.26.M1/SC/jerson.balaguera/innexiafrontend/-/blob/develop/src/app/shared/components/booking-card/booking-card.component.ts?ref_type=heads)
![](https://i.postimg.cc/sXNvbM97/Screenshot-from-2026-03-06-15-53-14.png)

#### this is the logic to disabled the cancel button there some validations between them:

- if there are no data in this.booking() (its the BookingCardData data)
- if the booking is cancelled
- if the booking has caught isCancelling() or cancelled() signal
- if the booking is in the past it's to say the date was over
- if the status param to the this.booking() signal is "CANCELLED" 

## Activity 4:

[Error Interceptor](https://gitlab.com/jala-university1/cohort-3/ES.CSPR-351.GA.T1.26.M1/SC/jerson.balaguera/innexiafrontend/-/blob/develop/src/app/core/interceptors/error.interceptor.ts?ref_type=heads)
![](https://i.postimg.cc/hvYDWs4H/Screenshot-from-2026-03-07-07-29-07.png)
[Cancelation booking logic](https://gitlab.com/jala-university1/cohort-3/ES.CSPR-351.GA.T1.26.M1/SC/jerson.balaguera/innexiafrontend/-/blob/develop/src/app/shared/components/booking-card/booking-card.component.ts?ref_type=heads)
![](https://i.postimg.cc/pV3rSV9V/Screenshot-from-2026-03-07-07-34-34.png)
[booking-component.html](https://gitlab.com/jala-university1/cohort-3/ES.CSPR-351.GA.T1.26.M1/SC/jerson.balaguera/innexiafrontend/-/blob/develop/src/app/shared/components/booking-card/booking-card.component.html?ref_type=heads)
![](https://i.postimg.cc/nhR6drzY/Screenshot-from-2026-03-07-07-38-02.png)
![](https://i.postimg.cc/59KL2MX6/Screenshot-from-2026-03-07-07-41-45.png)
