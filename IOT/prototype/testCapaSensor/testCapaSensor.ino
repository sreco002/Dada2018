#include <CapacitiveSensor.h>

/*
   CapitiveSense Library Demo Sketch
   Paul Badger 2008
   Uses a high value resistor e.g. 10M between send pin and receive pin
   Resistor effects sensitivity, experiment with values, 50K - 50M. Larger resistor values yield larger sensor values.
   Receive pin is the sensor pin - try different amounts of foil/metal on this pin
*/


CapacitiveSensor   cs_4_2 = CapacitiveSensor(4, 2);       // 10M resistor between pins 4 & 2, pin 2 is sensor pin, add a wire and or foil if desired
int tresh = 1000;
const int ledPin = 12;

void setup()
{
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  cs_4_2.set_CS_AutocaL_Millis(0xFFFFFFFF);     // turn off autocalibrate on channel 1 - just as an example

}

void loop()
{
  

  long start = millis();
  long sensorValue =  cs_4_2.capacitiveSensor(30);
 // Serial.println(sensorValue); 

//  Serial.print(millis() - start);        // check on performance in milliseconds
//  Serial.print("\t");                    // tab character for debug windown spacing

 

  if (sensorValue > tresh) {
     Serial.println(sensorValue);                  // print sensor output 1

    digitalWrite(ledPin, HIGH);
  }
  else {
    digitalWrite(ledPin, LOW);
  }
  delay(10);                             // arbitrary delay to limit data to serial port

}
