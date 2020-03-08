import * as React from 'react';
import {connect} from "react-redux";
import {
    Alert,
    Button,
    Card,
    CardFooter,
    CardText,
    Col,
    Container,
    Modal,
    Row,
} from 'reactstrap';
import {Store} from '../../store/reducers';
import * as loggerActions from "../../store/logger/actions";
import MainWindow from "./MainWindow";
import Values from "./Values";
import Controls from "./Controls";

interface TalkerProps {
    name: string,
}

/*
listfl(name)
char *name;
{
    FILE *a;
    char b[128];
    a=openlock(name,"r+");
    while(fgets(b,128,a)) printf("%s\n",b);
    fcloselock(a);
}

char *getkbd(s,l)   *//* Getstr() with length limit and filter ctrl *//*
char *s;
int l;
{
    char c,f,n;
    f=0;c=0;
    while(c<l)
    {
        regec:n=getchar();
        if ((n<' ')&&(n!='\n')) goto regec;
        if (n=='\n') {s[c]=0;f=1;c=l-1;}
        else
            s[c]=n;
        c++;
    }
    if (f==0) {s[c]=0;while(getchar()!='\n');}
    return(s);
}
*/

const Talker = ({ name }: TalkerProps) => <div>
    talker { name }
</div>;

interface StateProps {
    errorMessage?: string,
    stateName: string,
    userId: string,
    errorId?: number,
}

interface DispatchProps {
    logReset: (message: string) => loggerActions.LoggerAction,
}

interface GameGoProps {
    arg0: string,
    name: string,
}

type Props = StateProps & DispatchProps & GameGoProps;

interface State {
    noArgs: boolean,
    hasStarted: boolean,
}

class GameGo extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            noArgs: true,
            hasStarted: false,
        };

        this.closeStartModal = this.closeStartModal.bind(this);
    }

    static getDerivedStateFromProps(props: GameGoProps, currentState: State): State {
        const {
            arg0,
            name,
        } = props;
        return {
            ...currentState,
            noArgs: !arg0 || !name,
        };
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        const {
            userId,
            name,
            logReset,
        } = this.props;
        if (name !== prevProps.name) {
            logReset(`GAME ENTRY: ${name}[${userId}]`);
        }
    }

    closeStartModal() {
        this.setState({
            hasStarted: true,
        });
    }

    showStartModal() {
        const {
            hasStarted,
        } = this.state;
        return <Modal
            isOpen={!hasStarted}
        >
            <Card>
                <Container>
                    <CardText>Entering Game ....</CardText>
                    <CardFooter>
                        <Button
                            onClick={this.closeStartModal}
                        >
                            Ok
                        </Button>
                    </CardFooter>
                </Container>
            </Card>
        </Modal>;
    }

    render() {
        const {
            errorMessage,
            stateName,
            errorId,
        } = this.props;
        const {
            noArgs,
        } = this.state;
        return (<Card>
            {errorMessage && <Card>
                <hr />
                <Alert>{ errorMessage }</Alert>
                <hr />
            </Card>}
            {noArgs
                ? (<h1>Args!</h1>)
                : (<Row>
                    <Col xs={4}>
                        <Values />
                    </Col>
                    <Col>
                        { this.showStartModal() }
                        ((errorId === undefined)
                            ? (<MainWindow windowId={0}>
                                <Controls />
                                <Talker name={stateName} />
                            </MainWindow>)
                            : <Alert
                                    color="danger"
                                >
                                    Error: {errorId}
                                </Alert>
                        )
                    </Col>
                </Row>)
            }
        </Card>);
    }
}

const mapStateToProps = (store: Store): StateProps => ({
    errorMessage: store.mainWindow.errorMessage,
    stateName: store.mainWindow.name,
    userId: store.mainWindow.userId,
    errorId: store.mainWindow.errorId,
});

const mapDispatchToProps: DispatchProps = {
    logReset: loggerActions.logReset,
};


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GameGo);
