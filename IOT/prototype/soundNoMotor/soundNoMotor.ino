/*\
  use the soundsensor for Led activate  http://www.instructables.com/id/Arduino-Sound-Sensor-with-LED/

  stop continuous servo : https://arduino.stackexchange.com/questions/4076/what-is-commonly-done-to-stop-a-servo-after-reaching-desired-position

  servoPlayPos() , HSSR 1425 does not stop
  servoStopDetach() ,  HSSR 1425 stops after turning delay time


*/
int LED = 13;
int pinMotor = 9;
int soundSensor = 7;

int pos = 0;   // variable to store the servo position for servoPlayPos()
int delayServo = 3000;
int delaySound = 3000;
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
  //myservo.detach();
  statusSensor = digitalRead (soundSensor);
  Serial.print(statusSensor);

  if (statusSensor == 1)// sound is on
  {
    //motor is off
    
    Serial.println(statusSensor);
    Serial.println(">Do not Move");//motor is off
    digitalWrite(LED, HIGH);

  }

  else
  {
      //motor is on
    Serial.println(">Motor is On");
    digitalWrite(LED, LOW);
    servoStopDetach();
 
  }
 
  delay(delaySound);                           // waits to listen if there is a sound

}

void servoStopDetach() {
  myservo.attach(pinMotor);
  // attaches the servo to the servo object
  //delay(15);
  myservo.write(180);
  // sets the servo position according to the scaled value
 delay(delayServo);// change delay for increasng or decreasing the number of turn
  // waits for it to get to the position
  myservo.detach();

}




