#include <CapacitiveSensor.h>
/*made a box in cardboard , to prptotype light and mini projection of the wired hand*/
/*
   CapitiveSense Library Demo Sketch
   Paul Badger 2008
   Uses a high value resistor e.g. 10M between send pin and receive pin
   Resistor effects sensitivity, experiment with values, 50K - 50M. Larger resistor values yield larger sensor values.
   Receive pin is the sensor pin - try different amounts of foil/metal on this pin
*/


CapacitiveSensor   nanoBox = CapacitiveSensor(4, 7);       // 10M resistor between pins 4 & 7, pin 7 is sensor pin, add a wire and or foil if desired
int tresh = 1000;
const int ledPin = 12;
int toggle =0;

void setup()
{
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
 nanoBox.set_CS_AutocaL_Millis(0xFFFFFFFF);     // turn off autocalibrate on channel 1 - just as an example

}

void loop()
{
  

  long start = millis();
  long sensorValue =  nanoBox.capacitiveSensor(30);
 // Serial.println(sensorValue); 

//  Serial.print(millis() - start);        // check on performance in milliseconds
//  Serial.print("\t");                    // tab character for debug windown spacing

 

  if (sensorValue > tresh) {
     Serial.println(sensorValue);                  // print sensor output 1

    digitalWrite(ledPin, HIGH);
    delay(10000);// wait 10 sec before lighting down, Ronnie leDrew , in shadow theatre, change effect every 10 sec 
  }
  else {
    digitalWrite(ledPin, LOW);
  }
  delay(10);                             // arbitrary delay to limit data to serial port

}
