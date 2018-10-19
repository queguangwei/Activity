import React, {Component} from 'react'
import { Link } from 'react-router'
import { Row, Col, Button } from 'antd'
import { Navigator } from '../components/common'
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        document .documentElement.scrollTop = 0
    }

    render() {
        return (
            <div className="home">
                <Navigator />
                <div className="home_content">
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">
                                <Link to="/act/egg"><Button>跳蛋(h5)</Button></Link>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">
                                <Link to="/act/mlottery"><Button>转盘(h5)</Button></Link>
                            </div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">
                                <Link to="/act/lottery"><Button>转盘(web)</Button></Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Home
module.exports = exports['default']