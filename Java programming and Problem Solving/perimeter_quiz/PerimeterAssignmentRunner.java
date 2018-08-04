import edu.duke.*;
import java.io.File;

public class PerimeterAssignmentRunner {
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

    public int getNumPoints (Shape s) {
        // Put code here
        int len = 0;
        for(Point p : s.getPoints()){len++;}
        return len;
    }

    public double getAverageLength(Shape s) {
        // Put code here
         return getPerimeter(s)/getNumPoints(s);
    }

    public double getLargestSide(Shape s) {
        Point prevPt = s.getLastPoint();
        double maxLen = -1;
        
        for(Point currPt : s.getPoints()){
            double currDist = prevPt.distance(currPt);
            if(currDist > maxLen){maxLen = currDist;}
            prevPt = currPt;
        }
        return maxLen;
    }

    public double getLargestX(Shape s) {
        double maxX = -1;
        for(Point p : s.getPoints()){
            if(p.getX() > maxX) maxX = p.getX();
        }
        return maxX;
    }


    public void getFileWithLargestPerimeter() {
        // Put code here
        DirectoryResource dr = new DirectoryResource();

        double maxLen = -1;
        File maxFile = null;
        
        for (File f : dr.selectedFiles()) {
            double len = testPerimeter(f);
            if(len > maxLen){maxLen = len; maxFile = f;}
        }
        System.out.println("MaxFileName : " + maxFile.getName());
        System.out.println("Value : " + maxLen);
    }

    public double testPerimeter (File f) {
        return getPerimeter(new Shape(new FileResource(f)));
    }
    

    public static void main (String[] args) {
        PerimeterAssignmentRunner pr = new PerimeterAssignmentRunner();
        pr.getFileWithLargestPerimeter();
    }
}
