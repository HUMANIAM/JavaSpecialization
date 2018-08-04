import edu.duke.*;

public class PerimeterRunner {
    public double getPerimeter (Shape s) {
        // Start with totalPerim = 0
        double totalPerim = 0.0;
        // Start wth prevPt = the last point 
        Point prevPt = s.getLastPoint();
        // For each point currPt in the shape,
        for (Point currPt : s.getPoints()) {
            // Find distance from prevPt point to currPt 
            double currDist = prevPt.distance(currPt);
            // Update totalPerim by currDist
            totalPerim = totalPerim + currDist;
            // Update prevPt to be currPt
            prevPt = currPt;
        }
        // totalPerim is the answer
        return totalPerim;
    }
    
    public double getAverageLength (Shape s){
        return getPerimeter(s)/getNumPoints(s);
    }
    
    public int getNumPoints(Shape s){
        int len = 0;
        for(Point p : s.getPoints()){len++;}
        return len;
    }

    public double getLargestSide(Shape s){
        Point prevPt = s.getLastPoint();
        double maxLen = -1;
        
        for(Point currPt : s.getPoints()){
            double currDist = prevPt.distance(currPt);
            if(currDist > maxLen){maxLen = currDist;}
            prevPt = currPt;
        }
        return maxLen;
    }
    
    public double getLargestX (Shape s){
        double maxX = -1;
        for(Point p : s.getPoints()){
            if(p.getX() > maxX) maxX = p.getX();
        }
        return maxX;
    }
    
    public void testPerimeter () {
        FileResource fr = new FileResource();
        Shape s = new Shape(fr);
        System.out.println(getPerimeter(s));
        System.out.println(getNumPoints(s));
        System.out.println("getLargestSide");
        System.out.println(getLargestSide(s));
        double length = getPerimeter(s);
        System.out.println("perimeter = " + length);
    }

    public static void main (String[] args) {
        PerimeterRunner pr = new PerimeterRunner();
        pr.testPerimeter();
    }
}
