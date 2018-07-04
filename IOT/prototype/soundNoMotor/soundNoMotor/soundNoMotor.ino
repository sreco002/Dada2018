/*\
  use the soundsensor for Led activate  http://www.instructables.com/id/Arduino-Sound-Sensor-with-LED/

  stop continuous servo : https://arduino.stackexchange.com/questions/4076/what-is-commonly-done-to-stop-a-servo-after-reaching-desired-position

  servoPlayPos() , HSSR 1425 does not stop
  servoStopDetach() ,  HSSR 1425 stops after turning delay time


*/
int soundSensor = 7;
int LED = 12;
int pinMotor = 9;

int pos = 0;   // variable to store the servo position for servoPlayPos()
int delayServo = 5000;
int statusSensor = 0;
#include <Servo.h>

Servo myservo;  // create servo object to control a servo


void setup()
{
  Serial.begin(9600);
  pinMode (soundSensor, INPUT);
  pinMode (LED, OUTPUT);

  myservo.attach(pinMotor);  // attaches the servo on pin 9 to the servo object





}

void loop()
{
   statusSensor = digitalRead (soundSensor);
  Serial.println(statusSensor);

  if (statusSensor == 1)
  {
    //motor is on
    Serial.println("Motor is On");
    digitalWrite(LED, HIGH);
    myservo.write(255);                  // sets the servo position according to the scaled value
  
    servoStopDetach();
    //servoPlayPos();


  }

  else
  {
    digitalWrite(LED, LOW);







    

  }
  delay(15);                           // waits for the servo to get there

}

void servoStopDetach() {
  myservo.attach(pinMotor);
  // attaches the servo on pin 9 to the servo object
  delay(15);
  myservo.write(1);
  // sets the servo position according to the scaled value
  delay(delayServo);// change delay for increasng or decreasing the number of turn
  // waits for it to get to the position
  myservo.detach();
  delay(1000);
}

//void servoPlayPos() {
//  myservo.write(180);
//  delay(8000); ////stops motor for 8 seconds
//  for (pos = 180; pos >= 90; pos -= 1) // goes from 180 degrees to 0 degrees
//  {
//    myservo.write(pos);              // tell servo to go to position in variable 'pos'
//    delay(15); // waits 15ms for the servo to reach the position
//
//  }
//
//  myservo.write(90);
//  delay(10000); //stops motor for 4 seconds
//  myservo.detach();
//
//  for (pos = 90; pos <= 180; pos += 1) // goes from 0 degrees to 180 degrees
//  { // in steps of 1 degree
//    myservo.write(pos);              // tell servo to go to position in variable 'pos'
//    delay(10000);      // waits 15ms for the servo to reach the position
//
//  }
//}


