//HSR 1425CR

/*  use the soundsensor for Led activate  http://www.instructables.com/id/Arduino-Sound-Sensor-with-LED/

  stop continuous servo : https://arduino.stackexchange.com/questions/4076/what-is-commonly-done-to-stop-a-servo-after-reaching-desired-position

servoPlayPos() , HSSR 1425 does not stop
servoStopDetach() ,  HSSR 1425 stops after turning delay time

*/
int pos = 0;   // variable to store the servo position for servoPlayPos()
int delayServo = 5000;

#include <Servo.h>
#include <CapacitiveSensor.h>;

//servo------
Servo myservo;  // create servo object to control a servo


//capacitive sensor------
CapacitiveSensor   cs_4_2 = CapacitiveSensor(4, 2);       // 10M resistor between pins 4 & 2, pin 2 is sensor pin, add a wire and or foil if desired
int treshold = 1000;//1000

// pin the LED is connected to
const int LED = 12;

// Define the number of samples to keep track of.  The higher the number,
// the more the readings will be smoothed, but the slower the output will
// respond to the input.  Using a constant rather than a normal variable lets
// use this value to determine the size of the readings array.
const int numReadings = 10;

int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
int total = 0;                  // the running total
int average = 0;                // the average

//int inputPin = A0;
int val ; // value to send to servo


void setup()
{
  Serial.begin(9600);

  myservo.attach(6);  // attaches the servo on pin 9 to the servo object
  pinMode(LED, OUTPUT);

  cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);// turn off autocalibrate on channel 1 - just as an example


  // initialize serial communication with computer:
  Serial.begin(9600);
  // initialize all the readings to 0:

  for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readings[thisReading] = 0;
  }

}

void loop()
{
  // read from the sensor:
  long sensor1 =  cs_4_2.capacitiveSensor(120);
  Serial.println(sensor1);  // print sensor output
  readings[readIndex] = sensor1;

  // subtract the last reading:
  total = total - readings[readIndex];

  if (sensor1 > treshold)
  {
    digitalWrite(LED, HIGH);
     myservo.attach(6);
    servoPlayandStop();
  }

  else
  {
    digitalWrite(LED, LOW);

  }
  // add the reading to the total:
  total = total + readings[readIndex];
  // advance to the next position in the array:
  readIndex = readIndex + 1;

  // if we're at the end of the array...
  if (readIndex >= numReadings) {
    // ...wrap around to the beginning:
    //Serial.println("start again");
    readIndex = 0;
  }

  // calculate the average:
  average = total / numReadings;
  // send it to the computer as ASCII digits
  Serial.println(average);
  delay(1);        // delay in between reads for stability



}

//void servoPlayandStop() {
//
//  // attaches the servo on pin 9 to the servo object
//  delay(15);
//  myservo.write(1);
//  // sets the servo position according to the scaled value
//  delay(delayServo);// change delay for increasng or decreasing the number of turn
//  // waits for it to get to the position
//  myservo.detach();
// delay(1000);
//}
