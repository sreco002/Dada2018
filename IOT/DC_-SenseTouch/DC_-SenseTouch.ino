/*Using a Transistor to Control High Current Loads with an Arduino
  https://itp.nyu.edu/physcomp/labs/motors-and-transistors/using-a-transistor-to-control-high-current-loads-with-an-arduino/
*/
/* motor feed around 2.5V to have very small turn, "joker" */

#include <CapacitiveSensor.h>;

const int transistorPin = 9;    // connected to the base of the transistor
int cap_pin_out = 4;
int cap_pin_in = 2;
const int sensorPin = 9;    // connected to the base of the transistor

//capacitive sensor------
CapacitiveSensor   capSense = CapacitiveSensor(cap_pin_out, cap_pin_in);  // 10M resistor between pins 1 & 2, pin 2 is sensor pin, add a wire and or foil if desired


int treshold = 900;



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



void setup() {
  Serial.begin(9600);
  // initialize all the readings to 0:

  for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readings[thisReading] = 0;
  }
  // set  the transistor pin as output:
  pinMode(transistorPin, OUTPUT);

  capSense.set_CS_AutocaL_Millis(0xFFFFFFFF);// turn off autocalibrate on channel 1 - just as an example


}

void loop() {

  // read the sensor
  long sensorValue =   capSense.capacitiveSensor(30);
  //Serial.println(sensorValue);  // print sensor output sensor1

  // subtract the last reading:
  total = total - readings[readIndex];

  // read from the sensor:

  readings[readIndex] = sensorValue;

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
  // send it to the computer as ASCII digits
  // Serial.println(average);
  delay(1);        // delay in between reads for stability

  if (average >= treshold)  {// map the sensor value to a range from 0 - 255:

    val = map(average, 0, 1023, 0, 255);
    val =  constrain (val , 0, 255);

    // use that to control the transistor:
    Serial.println(val);
   // analogWrite(transistorPin, val);
    digitalWrite(transistorPin,HIGH);
    // digitalWrite(sensorPin,HIGH);
     delay (1800);
  }
  else if (average < treshold)  {
    analogWrite(transistorPin, 0);
    //digitalWrite(sensorPin, LOW);
    // Serial.println("stop");
  }









}

