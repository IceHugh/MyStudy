// The Single Responsibility Principle（单一职责SRP)

function Event(name) {
  let handles = [];
  this.getName = () => {
    return name;
  }
  this.addHandle = (handle) => {
    handles.push(handle);
  }
  this.removeHandle = (handle) => {
    for (let i=0, len=handles.length; i < len; i++) {
      if (handles[i] === handle) {
        handles.slice(i, 1);
      }
    }
  }
  this.fire = (args) => {
    handles.forEach( h = > {
      h(args);
    })
  }

