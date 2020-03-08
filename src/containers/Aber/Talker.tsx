import * as React from 'react';

interface Props {
    name: string,
}

interface State {
}

class Talker extends React.Component<Props, State> {
    render() {
        const {
            children,
        } = this.props;
        return (<div>
            Talker: { name }
            <div>
                {children}
            </div>
        </div>);
    }
}

export default Talker;
