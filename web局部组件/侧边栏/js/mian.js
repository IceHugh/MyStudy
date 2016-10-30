/**
 * Created by ygz on 2016/8/11.
 */
//自执行函数，避免了全局污染
(function(){
  // 创建对象，把变量和函数变成某个对象的属性和方法，其实变量和函数就是window对象的属性和方法，
  var Menubar = function(){
    this.el = document.querySelector('#sidebar ul');
    this.el.addEventListener('click',function(e){
      e.stopPropagation();
    });
    this.state = 'allClosed';
    this.currentState = null;
    this.currentOpendMenuContent = null;
    this.menuContentList = document.querySelectorAll('.nav-content>div.nav-con-close');
    for(i=0;i<this.menuContentList.length;i++){
      this.menuContentList[i].addEventListener('click',function(e){   //？？？？？？？？
        var menuCotent = e.currentTarget.parentNode;
        menuCotent.className = "nav-content";
        menuCotent.classList.add('menuContent-move-left');
        /*menuCotent.state = "allClosed";    第一次打开menuContent时，self.currentState = self.state把状态修改为了hasOpened；此时设置menuCotent.state不会改变初始状态，需要把self.state初始化*/
        self.state = "allClosed";
        console.log(menuCotent);
      })
    }
    var self = this;

    this.menuList = document.querySelectorAll('#sidebar ul>li');
    for(var i=0;i<this.menuList.length;i++){
      this.menuList[i].addEventListener('click',function(e){
        console.log(self);
        var menuContentEl = document.getElementById(e.currentTarget.id+'-content'); //当前element的id;
        if(self.state === 'allClosed'){      //所有对象是关闭状态
          menuContentEl.className = "nav-content";
          menuContentEl.classList.add('menuContent-move-right');
          self.currentOpendMenuContent = menuContentEl;   //把当前点击的对象存储
          self.state = "hasOpened";       //当前点击的对象的状态变为打开
          self.currentState = self.state;  //把当前点击的对象的状态存储
          console.log(123);
        }else{
          console.log(123);
          if(menuContentEl === self.currentOpendMenuContent){
            console.log(234);
            menuContentEl.className = "nav-content";
            menuContentEl.classList.add('menuContent-move-left');
            self.state = "allClosed";
            self.currentState = "allClosed";
            //当前点击的对象是上一个打开的对象,关闭上一个对象（当前对象）,关闭上一个对象是需要把所有的状态属性关闭
          }else{
            if(self.state === "hasOpened"){
              //点击其他对象，有打开的对象，则上一个对象关闭，当前对象打开
              self.currentOpendMenuContent.className = "nav-content";
              self.currentOpendMenuContent.classList.add('menuContent-move-left');
              self.currentState = "allClosed";     //上一个打开对象的状态关闭
              self.currentOpendMenuContent = menuContentEl;    //把当前点击的对象替换上一个打开的对象
              menuContentEl.className = "nav-content";
              menuContentEl.classList.add('menuContent-move-up');
              self.state = "hasOpened";       //当前对象打开
              console.log(self.currentState);
              console.log(self.state);
              console.log(self.currentOpendMenuContent.id);
              console.log(menuContentEl.id);
            }
          }
        }
      })
    }

  };

  var Sidebar = function(eId,closeBar){
    this.state = 'opened';
    this.el =document.getElementById(eId||'sidebar');
    this.closeBarEl =document.getElementById(closeBar||'closeBar');
    var self = this;
    this.menubar = new Menubar();
    this.el.addEventListener('click',function(event){
      if(event.target !== self.el){
        self.triggerSwich();
      }
    });
  };
  Sidebar.prototype.close = function(){
    console.log("关闭");
    this.el.className = 'sidebar-move-left';
    this.closeBarEl.className = 'closeBar-move-right';
    
    this.state = 'closed'
  };
  Sidebar.prototype.open = function(){
    console.log("打开");
    this.el.className = 'sidebar-move-right';
    this.closeBarEl.className = 'closeBar-move-left';
    this.state = 'opened';
  };
  Sidebar.prototype.triggerSwich = function(){
    if(this.state === 'opened'){
      this.close();
    }else{
      this.open();
    }
  };
  // Sidebar();  //把构造函数当做函数使用
  var sidebar = Sidebar();  //构造函数实例化，相当于把构造函数执行了一遍
})();