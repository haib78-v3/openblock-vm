const formatMessage = require('format-message');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const ProgramModeType = require('../../extension-support/program-mode-type');

const CommonPeripheral = require('../common/common-peripheral');

/**
 * The list of USB device filters.
 * @readonly
 */
const PNPID_LIST = [
    // CH340
    'USB\\VID_1A86&PID_7523',
    // CH9102
    'USB\\VID_1A86&PID_55D4',
    // CP2102
    'USB\\VID_10C4&PID_EA60'
];

/**
 * Configuration of serialport
 * @readonly
 */
const SERIAL_CONFIG = {
    baudRate: 57600,
    dataBits: 8,
    stopBits: 1
};

/**
 * Configuration for arduino-cli.
 * @readonly
 */
const DIVECE_OPT = {
    type: 'arduino',
    fqbn: 'esp32:esp32:esp32:UploadSpeed=921600'
};

const Pins = {
    D0: '4',
    D1: '5',
    D2: '13',
    D3: '23',
    D4: '14',
    A0: '15',
    A1: '25',
    A2: '26',
    A3: '27',
    A4: '32',
    A5: '33',
    A6: '34',
    A7: '35',
    A8: '36'
};


const Level = {
    High: 'HIGH',
    Low: 'LOW'
};



const Eol = {
    Warp: 'warp',
    NoWarp: 'noWarp'
};

/**
 * Manage communication with a Arduino esp32 peripheral over a OpenBlock Link client socket.
 */
class ZQrobot202 extends CommonPeripheral{
    /**
     * Construct a Arduino communication object.
     * @param {Runtime} runtime - the OpenBlock runtime
     * @param {string} deviceId - the id of the extension
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, deviceId, originalDeviceId) {
        super(runtime, deviceId, originalDeviceId, PNPID_LIST, SERIAL_CONFIG, DIVECE_OPT);
    }
}

/**
 * OpenBlock blocks to interact with a Arduino esp32 peripheral.
 */
class OpenBlockZQrobot202Device {
    /**
     * @return {string} - the ID of this extension.
     */
    static get DEVICE_ID () {
        return 'ZQrobot202';
    }

    get PINS_MENU () {
        return [
            {
                text: 'D0',
                value: Pins.D0
            },
            {
                text: 'D1',
                value: Pins.D1
            },
            {
                text: 'D2',
                value: Pins.D2
            },
            {
                text: 'D3',
                value: Pins.D3
            },
            {
                text: 'D4',
                value: Pins.D4
            }
        ];
    }

    get ANALOG_PINS_MENU () {
        return [
            {
                text: 'A0',
                value: Pins.A0
            },
            {
                text: 'A1',
                value: Pins.A1
            },
            {
                text: 'A2',
                value: Pins.A2
            },
            {
                text: 'A3',
                value: Pins.A3
            },
            {
                text: 'A4',
                value: Pins.A4
            },
            {
                text: 'A5',
                value: Pins.A5
            },
            {
                text: 'A6',
                value: Pins.A6
            },
            {
                text: 'A7',
                value: Pins.A7
            },
            {
                text: 'A8',
                value: Pins.A8
            }
            
        ];
    }

    get LEVEL_MENU () {
        return [
            {
                text:'高',
                value: Level.High
            },
            {
                text:'低',
                value: Level.Low
            }
        ];
    }

    get LEVEL1_MENU () {
        return [
            {
                text:'开启',
                value: Level.High
            },
            {
                text:'关闭',
                value: Level.Low
            }
        ];
    }

    get EOL_MENU () {
        return [
            {
                text: '换行',
                value: Eol.Warp
            },
            {
                text:'不换行',
                value: Eol.NoWarp
            }
        ];
    }

    get Read_keys1 (){
        return[
            {
                value: '0',
                text: '按下'
            },
            {
                value: '1',
                text: '松开'
            }
        ];
    }

    get Read_keys (){
        return[
            {
                value: '1',
                text: '方块'
            },
            {
                value: '2',
                text: '叉叉'
            },
            {
                value: '3',
                text: '圆圈'
            },
            {
                value: '4',
                text: '三角'
            },
            {
                value: '11',
                text: '向上'
            },
            {
                value: '12',
                text: '向左'
            },
            {
                value: '13',
                text: '向下'
            },
            {
                value: '14',
                text: '向右'
            },
            {
                value: '5',
                text: 'R1'
            },
            {
                value: '6',
                text: 'R2'
            },
            {
                value: '10',
                text: 'L1'
            },
            {
                value: '9',
                text: 'L2'
            },
            {
                value: '7',
                text: '右摇杆按键'
            },
            {
                value: '8',
                text: '左摇杆按键'
            },
            {
                value: '15',
                text: 'START'
            },
            {
                value: '16',
                text: 'SELECT'
            }
        ];
    }

    get Read_Analog (){
        return[
            {
                value: '1',
                text: '左摇杆上下'
            },
            {
                value: '2',
                text: '左摇杆左右'
            },
            {
                value: '3',
                text: '右摇杆上下'
            },
            {
                value: '4',
                text: '右摇杆左右'
            }
        ];
    }

    get ZQ_fx (){
        return[
            {
                value: '0',
                text: '正转'
            },
            {
                value: '1',
                text: '反转'
            }
        ];
    }

    get MOTOR_PORT (){
        return[
            {
                value: '1',
                text: '电机1'
            },
            {
                value: '2',
                text: '电机2'
            }
        ];
    }

    get What_line (){
        return[
            {
                value: '0',
                text: '黑线'
            },
            {
                value: '1',
                text: '白线'
            }
        ];
    }

    get line_lk (){
        return[
            {
                value: '10',
                text: '十字路口'
            },
            {
                value: '1',
                text: '左路口'
            },
            {
                value: '2',
                text: '右路口'
            }
        ];
    }

    get line_lkstop (){
        return[
            {
                value: '0',
                text: '结束后不停止'
            },
            {
                value: '1',
                text: '结束后停止'
            }
        ];
    }

    get line_turn (){
        return[
            {
                value: '2',
                text: '中间'
            },
            {
                value: '0',
                text: '左侧'
            },
            {
                value: '1',
                text: '右侧'
            }
        ];
    }

    get line_logic (){
        return[
            {
                value: '0',
                text: '小于'
            },
            {
                value: '1',
                text: '大于'
            },
            {
                value: '2',
                text: '等于'
            },
            {
                value: '3',
                text: '不等于'
            }
        ];
    }

    get RGB_ys (){
        return[
            {
                value: '0x000000',
                text: '关闭'
            },
            {
                value: '0xff0000',
                text: '红'
            },
            {
                value: '0xFF7F00',
                text: '橙'
            },
            {
                value: '0xFFFF00',
                text: '黄'
            },
            {
                value: '0x00FF00',
                text: '绿'
            },
            {
                value: '0x00FFFF',
                text: '青'
            },
            {
                value: '0x0000FF',
                text: '蓝'
            },
            {
                value: '0x8B00FF',
                text: '紫'
            }
        ];
    }


    get ZQ_yscgq (){
        return[
            {
                value: '1',
                text: 'R'
            },
            {
                value: '2',
                text: 'G'
            },
            {
                value: '3',
                text: 'B'
            },
            {
                value: '4',
                text: '色温'
            },
            {
                value: '5',
                text: '勒克斯(LUX)'
            }
        ];
    }





    /**
     * Construct a set of Arduino blocks.
     * @param {Runtime} runtime - the OpenBlock runtime.
     * @param {string} originalDeviceId - the original id of the peripheral, like xxx_arduinoUno
     */
    constructor (runtime, originalDeviceId) {
        /**
         * The OpenBlock runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // Create a new Arduino esp32 peripheral instance
        this._peripheral = new ZQrobot202(this.runtime,
            OpenBlockZQrobot202Device.DEVICE_ID, originalDeviceId);
    }

    /**
     * @returns {Array.<object>} metadata for this extension and its blocks.
     */
     getInfo () {
        return [
            {
                id: 'pin',
                name: "控制器",
                color1: '#4C97FF',
                color2: '#3373CC',
                color3: '#3373CC',

                blocks: [
                    {
                        opcode: 'ZQsetDigitalOutput',
                        text:'设置端口[PIN]数字输出[LEVEL]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D0
                            },
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level',
                                defaultValue: Level.High
                            }
                        }
                    },
                    {

                        opcode: 'ZQsetPwmOutput202',
                        text:'设置端口[PIN]模拟输出[OUT]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D0
                            },
                            OUT: {
                                type: ArgumentType.UINT8_NUMBER,
                                defaultValue: '255'
                            }
                        }
                    },
                    {
                        opcode: 'ZQsetqibeng',
                        text:'设置气泵端口[PIN]状态[LEVEL]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D0
                            },
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level1',
                                defaultValue: Level.High
                            }
                        }
                    },
                    {
                        opcode: 'ZQsetbeep202',
                        text:'设置蜂鸣器状态[LEVEL]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            LEVEL: {
                                type: ArgumentType.STRING,
                                menu: 'level1',
                                defaultValue: Level.High
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'ZQreadDigitalPin',
                        text:'读取数字端口[PIN]',
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D0
                            }
                        }
                    },
                    {
                        opcode: 'ZQreadAnalogPin',
                        text:'读取模拟端口[PIN]',
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'analogPins',
                                defaultValue: Pins.A0
                            }
                        }
                    },
                    {
                        opcode: 'ZQrun202',
                        text:'读取运行开关状态', 
                        blockType: BlockType.BOOLEAN,
                    },
                    {
                        opcode: 'ZQrunningTime',
                        text:'读取系统时间',
                        blockType: BlockType.REPORTER,
                        disableMonitor: true
                    },
                    '---',
                    {
                        opcode: 'ZQEEPROMupdate202',
                        text: 'EEPROM向地址[PIN]写数据[OUT]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                            OUT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'ZQEEPROMread202',
                        text:'EEPROM从地址[PIN]读数据', 
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'ZQdataMap',
                        text: '映射 [DATA] 从([ARG0], [ARG1]) 到 ([ARG2], [ARG3])',
                        blockType: BlockType.REPORTER,
                        arguments: {
                            DATA: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            ARG0: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1'
                            },
                            ARG1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '100'
                            },
                            ARG2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1'
                            },
                            ARG3: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1000'
                            }
                        },
                    },
                    '---',
                    {
                        opcode: 'ZQserialPrint202',
                        text:'设置串口打印[VALUE] [EOL]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            VALUE: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Hello Robot'
                            },
                            EOL: {
                                type: ArgumentType.STRING,
                                menu: 'eol',
                                defaultValue: Eol.Warp
                            }
                        }
                    },
                    {
                        opcode: 'ZQserialAvailable',
                        text:'串口是否有数据可读',
                        blockType: BlockType.REPORTER,
                        disableMonitor: true
                    },
                    {
                        opcode: 'ZQserialReadData',
                        text:'读取串口数据',
                        blockType: BlockType.REPORTER,
                        disableMonitor: true
                    }
                ],
                menus: {
                    pins: {
                        items: this.PINS_MENU
                    },
                    analogPins: {
                        items: this.ANALOG_PINS_MENU
                    },
                    level: {
                        acceptReporters: true,
                        items: this.LEVEL_MENU
                    },
                    level1: {
                        items: this.LEVEL1_MENU
                    },
                    eol: {
                        items: this.EOL_MENU
                    }
                }
            },
            {
                id: 'actuator',
                name:'执行器',
                color1: '#8ec43d',
                color2: '#78b331',
                color3: '#78b331',

                blocks: [
                    {
                        opcode: 'InitsetMotor',
                        text:'初始化 左电机[ARG0] [ARG1] 右电机[ARG2] [ARG3]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            ARG0: {
                                type: ArgumentType.STRING,
                                menu: 'PORT',
                                defaultValue: '1'
                            },
                            ARG1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '-100'
                            },
                            ARG2: {
                                type: ArgumentType.STRING,
                                menu: 'PORT',
                                defaultValue: '2'
                            },
                            ARG3: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '100'
                            }
                        },
                    },
                    {
                        opcode: 'setMotor',
                        text:'设置 [PIN1] 电机转速为 [ANGLE] ',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN1: {
                                type: ArgumentType.STRING,
                                menu: 'PORT',
                                defaultValue: '1'
                            },
                            ANGLE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'ZQrun',
                        text: '设置电机速度  左 [SPEEDl] 右 [SPEEDr]',
                        arguments: {
                        SPEEDl: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                        SPEEDr: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0'
                            },
                        }
                    },
                    {
                        opcode: 'ZQsetServoOutput202',
                        text:'设置舵机端口 [PIN] 输出 [OUT]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D0
                            },
                            OUT: {
                                type: ArgumentType.HALF_ANGLE,
                                defaultValue: '90'
                            }
                        }
                    },
                    {
                        opcode: 'setServo202',
                        text: '设置端口 [PIN] 舵机 [OUT]',
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D0
                            },
                            OUT: {
                                type: ArgumentType.STRING,
                                menu: 'fx',
                                defaultValue: '0'
                            },
                        }
                    },
                    {
                        opcode: 'ZQsetServoRead202',
                        text: '读取端口 [PIN] 舵机角度',
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D0
                            }
                        }
                    }
                ],
                menus: {
                    PORT: {
                        items: this.MOTOR_PORT
                    },
                    keys1: {
                        items: this.Read_keys1
                    },
                    Analog: {
                        items: this.Read_Analog
                    },
                    pins: {
                        items: this.PINS_MENU
                    },
                    fx: {
                        items: this.ZQ_fx
                    }
                }
            },
            {
                id: 'Controller',
                name:'遥控器',
                color1: '#e67817',
                color2: '#d26d15',
                color3: '#d26d15',
    
                blocks: [
                    {
                        opcode: 'setwx202',
                        text:'设置无线遥控 ID[PIN]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                defaultValue: "0000"
                            }
                        }
                    },
                    {
                        opcode: 'Readkeys',
                        text:'读取遥控按键 [PIN1] 值  状态 [PIN2] ',
                        blockType: BlockType.BOOLEAN,
                        arguments: {
                            PIN1: {
                                type: ArgumentType.STRING,
                                menu: 'keys'
                            },
                            PIN2: {
                                type: ArgumentType.STRING,
                                menu: 'keys1'
                            }
                        }
                    },
                    {
                        opcode: 'ReadAnalog',
                        text:'读取遥控摇杆 [PIN1] 值',
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN1: {
                                type: ArgumentType.STRING,
                                menu: 'Analog',
                                defaultValue: "1"
                            }
                        }
                    }
                ],
                menus: {
                    keys: {
                        items: this.Read_keys
                    },
                    keys1: {
                        items: this.Read_keys1
                    },
                    Analog: {
                        items: this.Read_Analog
                    }
                }
            },
            {
                id: 'RGBled',
                name:'RGB彩灯',
                color1: '#9966ff',
                color2: '#7d53d1',
                color3: '#7d53d1',
    
                blocks: [
                    {
                        opcode: 'RGBld',
                        text:'设置RGB灯 端口[PIN] 亮度[PIN1]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D0
                            },
                            PIN1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "255"
                            }
                        }
                    },
                    {
                        opcode: 'RGBLED',
                        text:'设置RGB灯 端口[PIN] 颜色[PIN1]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D0
                            },
                            PIN1: {
                                type: ArgumentType.COLOR
                            }
                        }
                    },
                    {
                        opcode: 'RGBLED1',
                        text:'设置RGB灯 端口[PIN] 颜色[PIN1]',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D0
                            },
                            PIN1: {
                                type: ArgumentType.STRING,
                                menu: 'RGBys',
                                defaultValue: '0x000000'
                            }
                        }
                    },
                    {
                        opcode: 'RGBLED2',
                        text:'设置RGB灯 端口[PIN] 颜色 R[PIN1] G[PIN2] B[PIN3] ',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PIN: {
                                type: ArgumentType.STRING,
                                menu: 'pins',
                                defaultValue: Pins.D0
                            },
                            PIN1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "255"
                            },
                            PIN2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "255"
                            },
                            PIN3: {
                                type: ArgumentType.NUMBER,
                                defaultValue: "255"
                            }
                        }
                    }
                ],
                menus: {
                    pins: {
                        items: this.PINS_MENU
                    },
                    RGBys: {
                        items: this.RGB_ys
                    }
                }
            },
            {
                id: 'ZQCOLOR',
                name:'颜色传感器',
                color1: '#d65cd6',
                color2: '#c048c0',
                color3: '#c048c0',
    
                blocks: [
                    {
                        opcode: 'COLORcgq',
                        text:'读取颜色传感器 [PIN1] 值',
                        blockType: BlockType.REPORTER,
                        arguments: {
                            PIN1: {
                                type: ArgumentType.STRING,
                                menu: 'ZQ_yscgq',
                                defaultValue: "1"
                            }
                        }
                    }
                ],
                menus: {
                    ZQ_yscgq: {
                        items: this.ZQ_yscgq
                    }
                }
            },
            {
                id: 'ZQpatrol',
                name:'巡线模块',
                color1: '#00979C',
                color2: '#008184',
                color3: '#007481',
    
                blocks: [
                    {
                        opcode: 'InitMOTOR',
                        blockType: BlockType.COMMAND,
                        text: '初始化巡线传感器 [PIN7] 地面灰度 [PIN1][PIN2][PIN3][PIN4][PIN5] 阀值[PIN6]' ,
                        arguments: {
                            PIN7: {
                                type: ArgumentType.STRING,
                                menu: 'What_line',
                                defaultValue: '0'
                            },
                            PIN1: {
                                type: ArgumentType.STRING,
                                menu: 'PINS',
                                defaultValue:Pins.A0
                            },
                            PIN2: {
                                type: ArgumentType.STRING,
                                menu: 'PINS',
                                defaultValue:Pins.A1
                            },
                            PIN3: {
                                type: ArgumentType.STRING,
                                menu: 'PINS',
                                defaultValue:Pins.A2
                            },
                            PIN4: {
                                type: ArgumentType.STRING,
                                menu: 'PINS',
                                defaultValue: Pins.A3
                            },
                            PIN5: {
                                type: ArgumentType.STRING,
                                menu: 'PINS',
                                defaultValue: Pins.A4
                            },
                            PIN6: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0.5'
                            }
                        }
                    },
                    {
                        opcode: 'Floorsensor',
                        blockType: BlockType.COMMAND,
                        text: '黑白检测' ,
                        arguments: {
                        }
                    },
                    {
                        opcode: 'straight',
                        blockType: BlockType.COMMAND,
                        text: '巡线 速度[PIN1]' ,
                        arguments: {
                            PIN1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            }
                        }
                    },
                    {
                        opcode: 'ZQline',
                        blockType: BlockType.COMMAND,
                        text: '路口巡线 [PIN1] 巡线速度 [PIN2] 过路口时间 [PIN3] [PIN4]' ,
                        arguments: {
                            PIN1: {
                                type: ArgumentType.STRING,
                                menu: 'line_lk',
                                defaultValue: '10'
                            },
                            PIN2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            PIN3: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0.1'
                            },
                            PIN4: {
                                type: ArgumentType.STRING,
                                menu: 'line_lkstop',
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'linetime',
                        blockType: BlockType.COMMAND,
                        text: '巡线计时 巡线速度 [PIN1] 巡线时间 [PIN2] [PIN3]' ,
                        arguments: {
                            PIN1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            PIN2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0.5'
                            },
                            PIN3: {
                                type: ArgumentType.STRING,
                                menu: 'line_lkstop',
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'linesensor',
                        blockType: BlockType.COMMAND,
                        text: '高级巡线 巡线速度 [PIN1] 传感器[PIN2][PIN3][PIN4]' ,
                        arguments: {
                            PIN1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            PIN2: {
                                type: ArgumentType.STRING,
                                menu: 'PINS',
                                defaultValue: Pins.A0
                            },
                            PIN3: {
                                type: ArgumentType.STRING,
                                menu: 'line_logic',
                                defaultValue: '0'
                            },
                            PIN4: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '500'
                            }
                        }
                    },
                    {
                        opcode: 'lineturn',
                        blockType: BlockType.COMMAND,
                        text: '转弯 左电机 [PIN1] 右电机 [PIN2] [PIN3]' ,
                        arguments: {
                            PIN1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            PIN2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '-50'
                            },
                            PIN3: {
                                type: ArgumentType.STRING,
                                menu: 'line_turn',
                                defaultValue: '2'
                            }
                        }
                    },
                    {
                        opcode: 'gotime',
                        blockType: BlockType.COMMAND,
                        text: '启动电机 左电机 [PIN1] 右电机 [PIN2] 时间[PIN3]' ,
                        arguments: {
                            PIN1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            PIN2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            PIN3: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '0.5'
                            }
                        }
                    },
                    {
                        opcode: 'gosensor',
                        blockType: BlockType.COMMAND,
                        text: '启动电机 左电机 [PIN1] 右电机 [PIN2] 传感器[PIN3][PIN4][PIN5]' ,
                        arguments: {
                            PIN1: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            PIN2: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '50'
                            },
                            PIN3: {
                                type: ArgumentType.STRING,
                                menu: 'PINS',
                                defaultValue: Pins.A0
                            },
                            PIN4: {
                                type: ArgumentType.STRING,
                                menu: 'line_logic',
                                defaultValue: '0'
                            },
                            PIN5: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '500'
                            }
                        }
                    },
                    {
                        opcode: 'next',
                        blockType: BlockType.COMMAND,
                        text: '启动按钮' ,
                        arguments: {
                        }
                    }
                ],
                menus: {
                    PINS: {
                        items: this.ANALOG_PINS_MENU
                    },
                    What_line: {
                        items: this.What_line
                    },
                    line_lk: {
                        items: this.line_lk
                    },
                    line_lkstop: {
                        items: this.line_lkstop
                    },
                    line_turn: {
                        items: this.line_turn
                    },
                    line_logic: {
                        items: this.line_logic
                    }
                }
            }
        ];
    }

    /**
     * Set pin mode.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin mode is done.
     */
    setPinMode (args) {
        this._peripheral.setPinMode(args.PIN, args.MODE);
        return Promise.resolve();
    }

    /**
     * Set pin digital out level.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin digital out level is done.
     */
    setDigitalOutput (args) {
        this._peripheral.setDigitalOutput(args.PIN, args.LEVEL);
        return Promise.resolve();
    }

    /**
     * Set pin pwm out value.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set pin pwm out value is done.
     */
    setPwmOutput (args) {
        this._peripheral.setPwmOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }

    /**
     * Read pin digital level.
     * @param {object} args - the block's arguments.
     * @return {boolean} - true if read high level, false if read low level.
     */
    readDigitalPin (args) {
        return this._peripheral.readDigitalPin(args.PIN);
    }

    /**
     * Read analog pin.
     * @param {object} args - the block's arguments.
     * @return {number} - analog value fo the pin.
     */
    readAnalogPin (args) {
        return this._peripheral.readAnalogPin(args.PIN);
    }

    /**
     * Set servo out put.
     * @param {object} args - the block's arguments.
     * @return {Promise} - a Promise that resolves after the set servo out value is done.
     */
    setServoOutput (args) {
        this._peripheral.setServoOutput(args.PIN, args.OUT);
        return Promise.resolve();
    }
}

module.exports = OpenBlockZQrobot202Device;
