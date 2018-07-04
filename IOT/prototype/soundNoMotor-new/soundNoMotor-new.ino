/*\
  use the soundsensor for Led activate  http://www.instructables.com/id/Arduino-Sound-Sensor-with-LED/

  stop continuous servo : https://arduino.stackexchange.com/questions/4076/what-is-commonly-done-to-stop-a-servo-after-reaching-desired-position

  servoPlayPos() , HSSR 1425 does not stop
  servoStopDetach() ,  HSSR 1425 stops after turning delay time
  for smoothing the sensor : using Tom Igoe smoothing
  https://programmingelectronics.com/tutorial-23-smoothing-data-old-version/

  Ok but still not very precise 2806

*/
int soundSensor = 7;
int LED = 13;
int pinMotor = 9;

int pos = 0;   // variable to store the servo position for servoPlayPos()
int delayServo = 8000;
int delaySound = 8000;
int statusSensor = 0;
#include <Servo.h>

Servo myservo;  // create servo object to control a servo


// Define the number of samples to keep track of.  The higher the number,
// the more the readings will be smoothed, but the slower the output will
// respond to the input.  Using a constant rather than a normal variable lets
// use this value to determine the size of the readings array.
const int numReadings = 10;

int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
int total = 0;                  // the running total
int average = 0;                // the average


void setup()
{
  Serial.begin(9600);
  pinMode (soundSensor, INPUT);
  pinMode (LED, OUTPUT);

  myservo.attach(pinMotor);  // attaches the servo on pin 9 to the servo object

  // initialize all the readings to 0:

  for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readings[thisReading] = 0;
  }



}

void loop()
{
  statusSensor = digitalRead (soundSensor);
 Serial.print(statusSensor);
  // subtract the last reading:
  total = total - readings[readIndex];

  // read from the sensor:
  readings[readIndex] = statusSensor;

  // add the reading to the total:
  total = total + readings[readIndex];
  // advance to the next position in the array:
  readIndex = readIndex + 1;
 // Serial.print( "r " + readIndex);
  // if we're at the end of the array...
  if (readIndex >= numReadings) {
    // ...wrap around to the beginning:
    readIndex = 0;
  }

  // calculate the average:
  average = total / numReadings;
  // send it to the computer as ASCII digits
  Serial.println(average);

  if (statusSensor==1) // sound is on
  {
    //motor is off

    Serial.println("Do not Move");//motor is off
    digitalWrite(LED, HIGH);

  }

  else if (average == 0)
  {
    //motor is on
    Serial.println("Motor is On");

    digitalWrite(LED, LOW);

    servoStopDetach();

  }



  // advance to the next position in the array:
  readIndex = readIndex + 1;

  // if we're at the end of the array...
  if (readIndex >= numReadings) {
    // ...wrap around to the beginning:
    //Serial.println("start again");
    readIndex = 0;
  }


  delay(delaySound);                           // waits to listen if there is a sound

}//end LOOP

void servoStopDetach() {
  myservo.attach(pinMotor);
  // attaches the servo on pin 9 to the servo object
  delay(15);
  myservo.write(180);
  // sets the servo position according to the scaled value
 // delay(delayServo);// change delay for increasng or decreasing the number of turn
  // waits for it to get to the position
  myservo.detach();

}




