/*!!!!!!!!!!!Do not change anything between here (the DRIVERNAME placeholder will be automatically replaced at buildtime)!!!!!!!!!!!*/
import NodeDriver from 'shared/mixins/node-driver';

// do not remove LAYOUT, it is replaced at build time with a base64 representation of the template of the hbs template
// we do this to avoid converting template to a js file that returns a string and the cors issues that would come along with that
const LAYOUT;
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/


/*!!!!!!!!!!!GLOBAL CONST START!!!!!!!!!!!*/
// EMBER API Access - if you need access to any of the Ember API's add them here in the same manner rather then import them via modules, since the dependencies exist in rancher we dont want to expor the modules in the amd def
const computed     = Ember.computed;
const get          = Ember.get;
const set          = Ember.set;
const alias        = Ember.computed.alias;
const service      = Ember.inject.service;

const defaultRadix = 10;
const defaultBase  = 1024;

const stringsToParams = (params, str) => {
  const index = str.indexOf('=');

  if ( index > -1 ) {
    params.push({
      key:   str.slice(0, index),
      value: str.slice(index + 1),
    });
  }

  return params;
};

const paramsToStrings = (strs, param) => {
  if (param.value && param.key) {
    strs.push(`${ param.key }=${ param.value }`);
  }

  return strs;
};
/*!!!!!!!!!!!GLOBAL CONST END!!!!!!!!!!!*/



/*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
export default Ember.Component.extend(NodeDriver, {
  driverName: '%%DRIVERNAME%%',
  config:     alias('model.%%DRIVERNAME%%Config'),
  app:        service(),

  initCategory:         null,
  initNetwork:          null,

  init() {
    // This does on the fly template compiling, if you mess with this :cry:
    const decodedLayout = window.atob(LAYOUT);
    const template      = Ember.HTMLBars.compile(decodedLayout, {
      moduleName: 'nodes/components/driver-%%DRIVERNAME%%/template'
    });
    set(this,'layout', template);

    this._super(...arguments);
    this.initCategoryParams('config.vmCategories', 'initCategory');
    this.initNetworkParams('config.vmNetwork', 'initNetwork');

  },
  /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

  // Write your component here, starting with setting 'model' to a machine with your config populated
  bootstrap: function() {
    // bootstrap is called by rancher ui on 'init', you're better off doing your setup here rather then the init function to ensure everything is setup correctly
    let config = get(this, 'globalStore').createRecord({
      type: '%%DRIVERNAME%%Config',
      username: "admin",
      vmCpus: 2,
      vmCores: 1,
      vmMem: 4096,
      vmCpuPassthrough: false,
      vmImage: "",
      vmImageSize: 0,
      vmNetwork: [],
      vmCategories: [],
      cluster: "",
      insecure: true,
      storageContainer: "",
      diskSize: 0,
      cloudInit: "#cloud-config\n\n"
    });

    set(this, 'model.%%DRIVERNAME%%Config', config);
  },

  // Add custom validation beyond what can be done from the config API schema
  validate() {
    // Get generic API validation errors
    this._super();
    var errors = get(this, 'errors')||[];
    if ( !get(this, 'model.name') ) {
      errors.push('Name is required');
    }

    // Add more specific errors

    // Check Account info
    if ( !get(this, 'config.endpoint') ) {
      errors.push('Management Endpoint is required');
    }
    if ( !get(this, 'config.username') ) {
      errors.push('Username is required');
    }
    if ( !get(this, 'config.password') ) {
      errors.push('Password is required');
    }
    if ( !get(this, 'config.cluster') ) {
      errors.push('Cluster is required');
    }

    // Check something and add an error entry if it fails:
    if ( parseInt(get(this, 'config.vmMem'), defaultRadix) < defaultBase ) {
      errors.push('Memory Size must be at least 1024 MB');
    }

    // Check template image
    if ( !get(this, 'config.vmImage') ) {
      errors.push('Template image is required');
    }

    // Check network interface
    if ( get(this, 'config.vmNetwork').length === 0 ) {
      errors.push('Network interface is required');
    }

    // Check storageContainer is a UUID
    if ( get(this, 'config.storageContainer') && !/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/i.test(get(this, 'config.storageContainer')) ) {
      errors.push('Storage Container must be a valid UUID');
    }

    if ( parseInt(get(this, 'config.diskSize')) > 0 && get(this, 'config.storageContainer') === '' ) {
      errors.push('Storage Container is required if disk size is set');
    }

    // Set the array of errors for display,
    // and return true if saving should continue.
    if ( get(errors, 'length') ) {
      set(this, 'errors', errors);
      return false;
    } else {
      set(this, 'errors', null);
      return true;
    }
  },

  actions: {
    categoryChanged(array) {
      this.updateCategoryParams('config.vmCategories', array);
    },
    
    networkChanged(array) {
      this.updateNetwork('config.vmNetwork', array);
    }
  },

  initCategoryParams(pairsKey, paramsKey) {
    set(this, paramsKey, (get(this, pairsKey) || []).reduce(stringsToParams, []));
  },

  updateCategoryParams(pairsKey, params) {
    set(this, pairsKey, params.reduce(paramsToStrings, []));
  },

  initNetworkParams(pairsKey, paramsKey) {
    set(this, paramsKey, (get(this, pairsKey) || []));
  },

  updateNetwork(pairsKey, networks) {
    set(this, pairsKey, networks);
  },

  // Any computed properties or custom logic can go here
});
