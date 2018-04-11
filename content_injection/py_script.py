import os

with open("test.txt","r") as f:
	for line in f:
		os.system("echo " + line.strip())	
