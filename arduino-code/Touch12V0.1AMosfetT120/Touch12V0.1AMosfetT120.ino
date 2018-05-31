/*switch on/ off a minibulb 12V 0.1A with capa sensor*/
/*Using a Transistor to Control High Current Loads with an Arduino
  https://itp.nyu.edu/physcomp/labs/motors-and-transistors/using-a-transistor-to-control-high-current-loads-with-an-arduino/
readings not stable !!!!
*
/
/*OK with mini bulb + 9V battery+ 12V plug and 5V arduino*/

#include <CapacitiveSensor.h>;

const int transistorPin = 9;    // connected to the base of the transistor

//capacitive sensor------
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
int treshold = 1000;
int maxReading = 0; // calibrate the top value for the readings


//int inputPin = A0;
int val ; // value to send to the high current device



void setup() {
  Serial.begin(9600);
  // initialize all the readings to 0:

  for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readings[thisReading] = 0;
  }
  // set  the transistor pin as output:
  pinMode(transistorPin, OUTPUT);

  cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);// turn off autocalibrate on channel 1 - just as an example


}

void loop() {
  average = 0;
  // read the sensor
  long sensorValue =   cs_4_2.capacitiveSensor(30);

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
  if ( average > maxReading) maxReading =  average;
  // send it to the computer as ASCII digits
  Serial.println(average);
  delay(10);        // delay in between reads for stability

  if (average >= treshold)  {// map the sensor value to a range from 0 - 255:

    analogWrite(transistorPin, 255);
   

  }
  else if (average < treshold)  {

    analogWrite(transistorPin, 0);

  }









}
