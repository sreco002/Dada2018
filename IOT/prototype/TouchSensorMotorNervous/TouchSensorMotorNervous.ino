
int pos = 0;   // variable to store the servo position for servoPlayPos()
int delayServo = 5000;
int treshold = 1000;//1000
const int LED = 12;
int pinIn = 2;//sensible pin
int pinOut = 4;
int pinMotor = 9;
#include <Servo.h>
#include <CapacitiveSensor.h>;

Servo myservo;  // create servo object to control a servo
CapacitiveSensor   cs_4_2 = CapacitiveSensor(4, 2);       // 10M resistor between pins 4 & 2, pin 2 is sensor pin, add a wire and or foil if desired


void setup() {
  Serial.begin(9600);
  myservo.attach(9);  // attaches the servo on pin 6 to the servo object
  pinMode(LED, OUTPUT);
  cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);// turn off autocalibrate on channel 1 - just as an example



}

void loop() {
  // read from the sensor:
  long sensor1 =  cs_4_2.capacitiveSensor(30);
  Serial.println(sensor1);  // print sensor output
  if (sensor1 > treshold)
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
    delay(15); // waits 15ms for the servo to reach the position

  }
  //
  myservo.write(90);
  myservo.detach();
}


void servoPlayNervous() {
  myservo.attach(9);
  // myservo.write(180);
  delay(8000); ////stops motor for 8 seconds
  //  for (pos = 180; pos >= 90; pos -= 1) // goes from 180 degrees to 0 degrees
  //  {
  //    myservo.write(pos);              // tell servo to go to position in variable 'pos'
  //    delay(15); // waits 15ms for the servo to reach the position
  //
  //  }

  // myservo.write(90);
  //delay(10000); //stops motor for 4 seconds
  myservo.detach();

  //  for (pos = 90; pos <= 180; pos += 1) // goes from 0 degrees to 180 degrees
  //  { // in steps of 1 degree
  //    myservo.write(pos);              // tell servo to go to position in variable 'pos'
  //    delay(10000);      // waits 15ms for the servo to reach the position
  //
  //  }
}





