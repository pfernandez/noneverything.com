
int xMax = window.innerWidth;
int yMax = window.innerHeight;
int bgColor = 250;
int n = 0;
String data[];

void setup() {
	size(xMax, yMax);
	background(bgColor);
	stroke(0);
	rectMode(CENTER);
	frameRate(10);
	
    data = loadStrings("data/0.0000000000000000.dat");
    println("there are " + data.length + " lines");

    for (int i=0; i < data.length; i++) {
        println(data[i]);
    }
/*
    for (int i=0; i < data.length; i++) {
        lineLength = data[i].length();
        println(lineLength);
    }
    String[] fontList = PFont.list();
println(fontList);
font = loadFont("monospace"); 

textFont(font); */
}

void draw() {

    if(n == data.length) {
        n = 0;
    }
    String[] columns = data[n].split(" ");
    println(columns);
    //background(255*columns[1]);
    n++;
    println(n);
    // fadeOut();
}





//Resize the window dimensions if it has been changed.
void resizeWindow() {
	if( xMax != window.innerWidth || yMax != window.innerHeight ) {
		xMax = window.innerWidth;
		yMax = window.innerHeight;
		size(window.innerWidth, window.innerHeight);
	}
}
 
 // adjust tracers
void fadeOut() {
	fill(bgColor, .5);
	rect(width/2, height/2, width, height);
}
