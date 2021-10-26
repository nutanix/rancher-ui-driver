# ui-driver-nutanix
Nutanix Rancher UI driver for Nutanix docker-machine drivers


## Using

* Add a Node Driver in Rancher 2.6 (Cluster Management -> Drivers -> Node Drivers)
  * Download URL: The URL for the driver binary (`https://github.com/nutanix/docker-machine/releases/download/v3.0.0-beta6/docker-machine-driver-nutanix_v3.0.0-beta6_linux`)
  * Custom UI URL: The URL for the UI driver (`https://nutanix.github.io/rancher-ui-driver/component.js`)
* Wait for the driver to become "Active"
* Go to Cluster Management -> RKE1 Configuration -> Node Templates, your can add a Nutanix Template and custom UI should show up.


## Fork

* Fork this repository into your own account as `ui-driver-DRIVERNAME`
  * DRIVERNAME should be the name of the driver that you would give to `docker-machine create --driver`, e.g. "mycompany", "digitalocean", "vultr", etc.
* Update the "name" in package.json to match
  * You should also update description, URLs, etc, but these aren't strictly required.
* `npm install`

## Development

This package contains a small web-server that will serve up the custom driver UI at `http://localhost:3000/component.js`.  You can run this while developing and point the Rancher settings there.
* `npm start`
* The driver name can be optionally overridden: `npm start -- --name=DRIVERNAME`
* The compiled files are viewable at http://localhost:3000.
* **Note:** The development server does not currently automatically restart when files are changed.
* Do not use the `model.<drivername>Confg` signature to access your driver config in the template file, use the `config` alias that is already setup in the component

## Building

For other users to see your driver, you need to build it and host the output on a server accessible from their browsers.

* `npm run build`
* Copy the contents of the `dist` directory onto a webserver.
  * If your Rancher is configured to use HA or SSL, the server must also be available via HTTPS.
