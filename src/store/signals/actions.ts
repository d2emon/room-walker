const sigNone = () => null;
    
const sigCtrlc = () => {
  /*
   */
};
  
const sigOops = () => {
  /*
   */
};

export const sighup = sigOops;
export const sigint = sigCtrlc;
export const sigterm = sigCtrlc;
export const sigtstp = sigNone;
export const sigquit = sigNone;
export const sigcont = sigOops;
