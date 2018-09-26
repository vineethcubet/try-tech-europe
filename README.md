# Try the Tech
Demonstrating to customers how a Battery Electric Vehicle (BEV) can fit into their lives.

## Structure

### Frontend

The frontend of this application is written in the three standard web technologies -- JavaScript, HTML, and CSS. It makes use of [VueJS](https://vuejs.org/), a JavaScript framework, and [SASS](https://sass-lang.com/), a CSS pre-processor.

### Backend

While not being utilized at the moment, the backend is a [Spring Boot](https://spring.io/projects/spring-boot) application written in [Kotlin](https://kotlinlang.org/). The project briefly turned towards accepting and saving user input, bust just as quickly as the idea came, we pivoted away from the idea, just not before we stood up a backend.

## Shipping and Releasing

There are two utility scripts included in the root of this repository: `ship.sh` and `release.sh`. `ship.sh` runs tests and static code analysis, and assuming those tasks succeed, it will push the code. `release.sh` will first run `ship.sh` and if that script succeeds, it will generate an artifact and push it to PCF.
