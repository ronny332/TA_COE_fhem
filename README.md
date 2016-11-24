# TA_COE_fhem
Nodejs implementation of the CoE (Can over Ethernet) Standard from TA (Technische Alternative).

In the current state the software reads all UDP packages sent by the CMI Interface and compares it with the layout, setted in config.js (config.knots).
For now it reads just analog values, digital values will follow in the future.

Received and valid frames (14 bytes each), will be sent to a running FHEM instance by telnet. For now only unsecured telnet ports are usable.

# Build
* clone this repository: `git clone https://github.com/ronny332/TA_COE_fhem`
* install dependencies: `npm install`
* modify config.js: `vim config.js`
* start TA_CoE_fhem: `node index.js`

![TA_CoE_fhem in an early version](https://github.com/ronny332/TA_CoE/raw/master/ta_coe_fhem.png)