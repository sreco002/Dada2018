
int pos = 0;   // variable to store the servo position for servoPlayPos()
int treshold = 2000;//1000
const int LED = 12;
int pinIn = 2;//sensible pin
int pinOut = 4;
int pinMotor = 9;
#include <Servo.h>
#include <CapacitiveSensor.h>;

Servo myservo;  // create servo object to control a servo
CapacitiveSensor   cs_4_2 = CapacitiveSensor(4, 2);       // 10M resistor between pins 4 & 2, pin 2 is sensor pin, add a wire and or foil if desired




// Define the number of samples to keep track of.  The higher the number,
// the more the readings will be smoothed, but the slower the output will
// respond to the input.  Using a constant rather than a normal variable lets
// use this value to determine the size of the readings array.
const int numReadings = 10;

int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
int total = 0;                  // the running total
int average = 0;                // the average

int val ; // value to send to servo




void setup() {
  Serial.begin(9600);
  myservo.attach(9);  // attaches the servo on pin 6 to the servo object
  pinMode(LED, OUTPUT);
  cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);// turn off autocalibrate on channel 1 - just as an example

  for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readings[thisReading] = 0;
  }


}

void loop() {


  average = 0;

  // read from the sensor:
  long sensor1 =  cs_4_2.capacitiveSensor(50);


  // subtract the last reading:
  total = total - readings[readIndex];
  // read from the sensor:

  readings[readIndex] = sensor1;

  // add the reading to the total:
  total = total + readings[readIndex];
  // advance to the next position in the array:
  readIndex = readIndex + 1;

  // if we're at the end of the array...
  if (readIndex >= numReadings) {
    // ...wrap around to the beginning:
    // Serial.println("start again");
    readIndex = 0;
  }

  // calculate the average:
  average = total / numReadings;
  delay(1);        // delay in between reads for stability
  Serial.println(average);  // print sensor output sensor1


  if (average > treshold)
  {
    digitalWrite(LED, HIGH);
    myservo.attach(9);
    servoPlayPos();

  }

  else
  {
    digitalWrite(LED, LOW);

  }

}


//== == == FUNCTIONS

void servoPlayPos() {
  // putting delay , will increase the delay at the global level !!!
  myservo.write(180);// go to position

  for (pos = 180; pos >= 90; pos -= 1) // goes from 180 degrees to 0 degrees
  {
    myservo.write(pos);              // tell servo to go to position in variable 'pos'
    delay(1); // waits 15ms for the servo to reach the position, 1 ms is jittery , fun and stability improve as wewait less between readings

  }

  myservo.detach();
}








