import sys

with open("data_file.csv","a") as f:
	for arg in sys.argv[1:]:
		f.write(arg+"\n")
		print(arg)
