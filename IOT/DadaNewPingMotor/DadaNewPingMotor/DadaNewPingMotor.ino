// ---------------------------------------------------------------------------
// Calculate a ping median using the ping_timer() method. example of NewPing library
// ---------------------------------------------------------------------------

#include <NewPing.h>

#include <Servo.h>

#define ITERATIONS     5 // Number of iterations.
#define TRIGGER_PIN   12 // Arduino pin tied to trigger pin on ping sensor.
#define ECHO_PIN      11 // Arduino pin tied to echo pin on ping sensor.
#define MAX_DISTANCE 120 // Maximum distance (in cm) to ping.
#define PING_INTERVAL 33 // Milliseconds between sensor pings (29ms is about the min to avoid cross-sensor echo).
#define MAX_RANGE 60 // Maximum distance (in cm) to ping.
#define LEDPin 13
unsigned long pingTimer[ITERATIONS]; // Holds the times when the next ping should happen for each iteration.
unsigned int cm[ITERATIONS];         // Where the ping distances are stored.
uint8_t currentIteration = 0;        // Keeps track of iteration step.

NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE); // NewPing setup of pins and maximum distance.


Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards


int pos = 0;    // variable to store the servo position
int pinMotor = 9;
int delayServo = 5000;
void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object

  Serial.begin(9600);
  pingTimer[0] = millis() + 75;            // First ping starts at 75ms, gives time for the Arduino to chill before starting.
  for (uint8_t i = 1; i < ITERATIONS; i++) // Set the starting time for each iteration.
    pingTimer[i] = pingTimer[i - 1] + PING_INTERVAL;
}

void loop() {
  for (uint8_t i = 0; i < ITERATIONS; i++) { // Loop through all the iterations.
    if (millis() >= pingTimer[i]) {          // Is it this iteration's time to ping?
      pingTimer[i] += PING_INTERVAL * ITERATIONS; // Set next time this sensor will be pinged.
      if (i == 0 && currentIteration == ITERATIONS - 1) oneSensorCycle(); // Sensor ping cycle complete, do something with the results.
      sonar.timer_stop();          // Make sure previous timer is canceled before starting a new ping (insurance).
      currentIteration = i;        // Sensor being accessed.
      cm[currentIteration] = 0;    // Make distance zero in case there's no ping echo for this iteration.
      sonar.ping_timer(echoCheck); // Do the ping (processing continues, interrupt will call echoCheck to look for echo).

    }

  }



  // Other code that *DOESN'T* analyze ping results can go here.

}

void echoCheck() { // If ping received, set the sensor distance to array.
  if (sonar.check_timer())
    cm[currentIteration] = sonar.ping_result / US_ROUNDTRIP_CM;
}

void oneSensorCycle() { // All iterations complete, calculate the median.
  unsigned int uS[ITERATIONS];
  uint8_t j, it = ITERATIONS;
  uS[0] = NO_ECHO;
  for (uint8_t i = 0; i < it; i++) { // Loop through iteration results.
    if (cm[i] != NO_ECHO) { // Ping in range, include as part of median.
      if (i > 0) {          // Don't start sort till second ping.
        for (j = i; j > 0 && uS[j - 1] < cm[i]; j--) // Insertion sort loop.
          uS[j] = uS[j - 1];                         // Shift ping array to correct position for sort insertion.
      } else j = 0;         // First ping is sort starting point.
      uS[j] = cm[i];        // Add last ping to array in sorted position.
    } else it--;            // Ping out of range, skip and don't include as part of median.
  }


  if (uS[it >> 1] >= MAX_RANGE) {
    /* Send a negative number to computer and Turn LED ON
      to indicate "out of range" */
    Serial.println("0");// too far "0"Swing

    digitalWrite(LEDPin, LOW);
    //servo activation
    myservo.attach(pinMotor);
    myservo.write(180);// go to position

  }
  else if (uS[it >> 1] != 0) {
    /* Send the distance to the computer using Serial protocol, and
      turn LED OFF to indicate successful reading. */
    // Serial.print(uS[it >> 1]);
    Serial.println("Hello");//close enough "Hello"Freeze
    digitalWrite(LEDPin, HIGH);
    myservo.detach();
  }


}

void servoStopDetach() {
  myservo.attach(pinMotor);
  // attaches the servo on pin 9 to the servo object
  delay(15);
  myservo.write(180);
  // sets the servo position according to the scaled value
  // delay(delayServo);// change delay for increasng or decreasing the number of turn
  // waits for it to get to the position



}






