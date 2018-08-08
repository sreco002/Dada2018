import random
import tracery #grammar generator
import json
import secrets #hexadecimal generator
import requests # get url and data from JSON
from nltk.tag import pos_tag


#import json files we need to create the story
#when json files is a simple list, we can have random use of it in the rules of  tracery grammar settings
adj_data = json.loads(open("data/adjs.json").read())
adj_list = adj_data["adjs"]
mood_data = json.loads(open("data/moods.json").read())
moods = mood_data["moods"] # I had to look at the JSON data itself to determine that this was the correct key!
body_data = json.loads(open("data/bodyParts.json").read())
body = body_data["bodyParts"]
code_verbs_data = json.loads(open("data/code_verbs.json").read())
code_verb = code_verbs_data["common_verbs"]
verbs_data = json.loads(open("data/verbs.json").read())
verbs = verbs_data["verbs"]
tarot_data = json.loads(open("data/tarot_interpretations.json").read())
cards = tarot_data["tarot_interpretations"]
newTech_data = json.loads(open("data/new_technologies.json").read())
newTech = newTech_data["technologies"]
motor = ["DC motor","servo","sensor"]
source_txt= [line.strip() for line in open("data/nodeMaskText.txt")]
#len(source_txt)
sentences=[]

#objects.json from Corpora with addition of specific vocab from nodeMaskText

objects_data = json.loads(open("data/objects.json").read())
object_list = objects_data["objects"]

#CREATE THE STORY

#0-Sentence
#take a random sentence from the source text and add a context environment from newTechnologies corpus in Corpora
sentence = "In the " + newTech[random.randint(1,len(newTech))]+", "+source_txt[random.randint(1,len(source_txt))]+ "."
sentences.insert(0,sentence)
print(sentence)

#1 and 2 Sentence
#retrieve the NLTK tags
tagged_sent = pos_tag(sentence.split())
#check if we have nouns singular or plural
pluralnouns = [word for word,pos in tagged_sent if (pos == 'NNS')] # looking for noun plural
singnouns = [word for word,pos in tagged_sent if (pos == 'NN')] # looking for noun singular
# write a dialogue based on the nouns we have from the random sentence taken from the source text
if len(pluralnouns)!=0:
    noun = random.choice(pluralnouns)
    # set the mood of the noun
    sentence = "The " + noun + " are " + random.choice(moods)+"."
    sentences.insert(1,sentence)
    print(sentence)
    #print("The " + noun + " are " + random.choice(moods))
    #say hello
    rules = {
      "origin": ["#greeting#, #noun#! we are the #characters#s on your #bodypart#. "],
    "greeting": ["Howdy", "Hello", "Greetings", "What's up", "Hey", "Hi"],
    "farewell":["Bye","Ciao","See ya","Salut","Kiss","XOXO"],
    "noun": noun,
    "characters": ["node","paranode","mask","puppet","network","computer"],
    "bodypart" : body
    }

    grammar = tracery.Grammar(rules)
    # just one sentence:
    sentence = grammar.flatten("#origin#")
    sentences.insert(2,sentence)
    print(sentence)
    #print(grammar.flatten("#origin#"))


elif len(singnouns)!=0:
    noun = random.choice(singnouns)
    sentence = "The " + noun + " of the " + random.choice(motor)+" is " + random.choice(moods)+". "
    sentences.insert(1,sentence)
    sentences.insert(2,"")
    print(sentence)
    #print("The " + noun + " of the " + random.choice(motor)+" is " + random.choice(moods))
    #give an order
    tense ='present'

#3-sentence
    sentence = random.choice(verbs)[tense].capitalize() +" the "+ random.choice(body)+ "!"
    sentences.insert(3,sentence)
    print (sentence)

    #print(random.choice(verbs)[tense].capitalize() +" the "+ random.choice(body)+ "!")

#4 and 5 sentence with proverb and hexadecimals
proverbs_data = json.loads(open("data/proverbs.json").read())
proverb = proverbs_data["proverbs"]
#create the list of keys from the dictionary of proverbs
newlist =[]

for i in range(len(proverb)):
   for item in proverb[i].keys():
     newlist.append(item)
theme=random.choice(newlist)
from collections import defaultdict
newdict=  defaultdict(list)
for i in range(len(newlist)):
    newdict[i]=(newlist[i])

#choose random number, to select the the key , in dictionary of themes,
#choose random sentence from the proverbs in the theme
p = random.randint(0,len(proverb))
listnum= [3,5,7,8,13]
#p = random.choice(listnum)
s = random.randint(0,len(proverb[p][newdict[p]]))
h = secrets.token_hex(3)
prov= proverb[p][newdict[p]][s]
#print( str(num)  + letter+" for the "+noun+","+prov )
# message for one indexed node
sentence4 = h + " for the node- "+ noun
#the message
sentence5 = "\n"+prov
sentences.insert(4,sentence4)
sentences.insert(5,sentence5)
print(sentence4.capitalize(),sentence5)

#print( h +" for the "+noun+". "+"\n"+prov )

#6 and 7-sentence with Tracery grammar generator
#statement , the challenge
statement_rules = {
    "origin": ["The #analog# look like #adjective# #object#s. "],
    "greeting": [ "What's up", "Hey", "Hi", "Oops", "OMG"],

    "analog": ["animals", "humans", "plants","trees"],

    "codeVerb":code_verb,
    "noun": noun,
    "characters": ["node","paranode","mask","puppet","network","computer"],
    "adjective":random.choice(adj_list),
    "bodypart" : body,
    "object": random.choice(object_list)
    }
#decision , the solution
decision_rules = {
    "origin": ["\nThe #digital# will #codeVerb# them. "],
    "noun": noun,
    "object": random.choice(object_list),
    "digital": [ "blobs","particles","rectangles","vertices","triangles","ellipses","circles","meshes","lines","files","folders"],
    "codeVerb":code_verb,
      }
statement_grammar = tracery.Grammar(statement_rules)
decision_grammar = tracery.Grammar(decision_rules)

sentence6 = statement_grammar.flatten("#origin#")
sentence7 = decision_grammar.flatten("#origin#")
sentences.insert(6,sentence6)
sentences.insert(7,sentence7)
print (sentence6,sentence7)
#print( statement_grammar.flatten("#origin#"),decision_grammar.flatten("#origin#"))


#write the sentences in a file "dadaPoem.txt" for the nodes to read outloud
#uncomment to check the poem
#sentences
