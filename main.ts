led.enable(false)
let GripperStatus = 0
let GripperRelease = 1
let gripperState = 0;
let winchInner = AnalogPin.P0
let winchOuter = AnalogPin.P1
let rotor = AnalogPin.P2
let gripper = AnalogPin.P3
let SERVO_STOP = 90
let GRIPPER_RELEASED = 130  // 180
let GRIPPER_CLOSED = 40     // 90
radio.setGroup(81)
pins.servoWritePin(winchInner, SERVO_STOP)
pins.servoWritePin(winchOuter, SERVO_STOP)
pins.servoWritePin(rotor, SERVO_STOP)
radio.onReceivedValue(function (name, value) {
    if (name == "rotate") {
        pins.servoWritePin(rotor, value)
    } else if (name == "inner") {
        pins.servoWritePin(winchInner, value)
    } else if (name == "outer") {
        pins.servoWritePin(winchOuter, value)
    } else if (name == "gripper") {
        gripperState = value;
        // if (value == 1) {
        //     if (GripperRelease == 1) {
        //         GripperStatus = 1
        //         GripperRelease = 0
        //     }
        // } else {
        //     GripperRelease = 1
        // }
    }
})

basic.forever(function () {
    if (gripperState === 1) {
        pins.servoWritePin(gripper, GRIPPER_RELEASED);
    } else {
        pins.servoWritePin(gripper, GRIPPER_CLOSED);
    }

    // if (GripperStatus == 1) {
    //     pins.servoWritePin(gripper, GRIPPER_CLOSED)
    //     // basic.showIcon(IconNames.Chessboard)
    //     basic.pause(4000)
    //     for (let index = 0; index < 6; index++) {
    //         // basic.clearScreen()
    //         basic.pause(400)
    //         // basic.showIcon(IconNames.Chessboard)
    //         basic.pause(400)
    //     }
    //     GripperStatus = 0
    // } else {
    //     // basic.clearScreen()
    //     // basic.showIcon(IconNames.Chessboard)
    //     pins.servoWritePin(gripper, GRIPPER_RELEASED)
    // }
})