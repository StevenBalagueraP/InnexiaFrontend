## Activity 1:

![](https://i.postimg.cc/nVDZ0P1P/Screenshot-from-2026-03-01-20-18-34.png)

### Room component Reuse

![](https://i.postimg.cc/SKRb8TRF/Screenshot-from-2026-03-01-20-19-44.png)
- We reuse the room component in the hotel booking page using a input property called variant to change the style of the component. this allow us to have a single source of truth for the room component and avoid code duplication. and also we decided if we want to use the room in the hotel-booking component or in the search component when the user selec a filter.

### Room component modifications
- we modified the room cmponent with another inputs like price, booking button and a description larger

![](https://i.postimg.cc/qBLQVkQb/Screenshot-from-2026-03-01-20-24-29.png)
- we use a if confition to decide if we want to show the price and the booking button using the variant input property.

- another thing that we can do is select an specific room to book it, and we can see the room selected in the hotel booking page.

![](https://i.postimg.cc/yN4035v9/Screenshot-from-2026-03-01-20-25-58.png)

## Activity 2:

I dont have explained the logic abot how the hotel booking page works, but I can explain it now. firstly we use the router to navigate to the hotel booking page using the hotel id. then we use the hotel service to get the hotel information using the hotel id. and finally we display the hotel information in the hotel booking page. but if there are some filter in the search page, we use the hotel service to get the hotel information using the hotel id and the filters. and finally we display the hotel information in the hotel booking page. so with that context I gonna explain you the reactive logic of the hotel booking page.

- If we increment the counter for adult or children the system will take this value and will take this parameters as peopleCount that is the total number of the people in our case is peoplecount = childrens + adults 

- For that reason when we increment the counter for adults o children the system automatically will take this value and will take this parameters as peopleCount and gonna make a service call and result the value in real time without reload the page


## Link to the video explaining all the reactive component 
### https://drive.google.com/file/d/1WDLPGx0Clb6lTiGpjyuT8KlyLIfgkrx2/view?usp=sharing

## Activity 3: 

![](https://i.postimg.cc/3wZQDk2Z/Screenshot-from-2026-03-01-21-08-26.png)
![](https://i.postimg.cc/1RbRSNBC/Screenshot-from-2026-03-01-21-11-42.png)

## Activity 4:

#### when we clicked on the booking button we call the /book post service and put the data in the MongoDB database
![](https://i.postimg.cc/LXYdQNcR/Screenshot-from-2026-03-01-21-14-56.png)
![](https://i.postimg.cc/Nfwhb8pw/Screenshot-from-2026-03-01-21-15-46.png)

### Video To explain all the Flow for Activity 3 and Activity 4:

#### I preffer to make a video to explain all the flow for Activity 3 and Activity 4 because there are many thing to explain and I think that a video gonna be more helpful than a text.

## https://drive.google.com/file/d/1HF_0qUzRwy5wDA9PIz3UIv8PExt4o6Ur/view?usp=sharing
