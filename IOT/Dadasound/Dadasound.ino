/*\
  use the soundsensor for Led activate  http://www.instructables.com/id/Arduino-Sound-Sensor-with-LED/

  to listen to the motors on the island, if they are moving, there is no one looking
  if they are not moving , there must be someone , we have ot talk to the visitor
  say Hello to the server
*/

/*smoothing with http://henrysbench.capnfatz.com/henrys-bench/arduino-sensors-and-input/arduino-sound-detection-sensor-tutorial-and-user-manual/
*/

int soundSensor = 7;
int LED = 13;


int pos = 0;   // variable to store the servo position for servoPlayPos()
int delaySound = 100;
int statusSensor = 0;




void setup()
{
  Serial.begin(9600);
  pinMode (soundSensor, INPUT);
  pinMode (LED, OUTPUT);




}

void loop()
{
  statusSensor = digitalRead (soundSensor);
  //Serial.println(statusSensor);
  //delayMicroseconds(2);
  if (statusSensor == 1)// sound is high enough, //motors are on. Sounds in the Box
  {


    digitalWrite(LED, HIGH);
    Serial.println("0");// do not talk


  }

  else
  {
    // motor is off ,no Sound in the Box there is someone , talk to the visitor
    digitalWrite(LED, LOW);
    Serial.println("Hello");

  }
  delay(delaySound);                           // waits for the servo to get there

}



