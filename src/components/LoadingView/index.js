import "./style.css";
import { ThreeDots } from "react-loader-spinner";

const LoadingView = () => (
  <div className="loader-container" data-testid="loader">
    <ThreeDots type="ThreeDots" color="#263868" height={50} width={50} />
  </div>
);

export default LoadingView;

//Audio, BallTriangle, Bars, Blocks, Circles, CirclesWithBar, ColorRing, Comment, DNA, Discuss, FallingLines,
//  FidgetSpinner, Grid, Hearts, Hourglass, InfinitySpin, LineWave, MagnifyingGlass, MutatingDots, Oval, ProgressBar, Puff, Radio,
// RevolvingDot, Rings, RotatingLines, RotatingSquare, RotatingTriangles, TailSpin, ThreeCircles, ThreeDots, Triangle, Vortex, Watch)
