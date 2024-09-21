Page({
  data: {
    show: false,
    hobby: false,
    avatar: '/images/1.jpg',  // 使用本地图片路径
    nickName: '孙卓异',
    phone: '19506201997',
    // 编辑时临时数据
    tempList: {
      avatarTemp: '/images/1.jpg',
      nameTemp: '孙卓异',
      phoneTemp: '1329998961@qq.com',
    },
    arraySex: ['女', '男'],
    indexSex: 1,  // 设置为男
    attrImg: [],  // 图片分享栏
    hobbyVal: '',
    labelList: ['打篮球', '爬山', '游泳', '旅游']  // 兴趣爱好
  },
  editClick() {
    this.setData({
      show: true,
      hobby: false
    })
  },
  // 添加兴趣爱好【注意：itemList最长6】
  addHobbyClick() {
    var that = this;
    var list = ['自定义', '打篮球', '打羽毛球', '游泳', '爬山', '踢足球'];
    var attr = this.data.labelList;
    wx.showActionSheet({
      itemList: list,
      success(res) {
        if (res.tapIndex == 0) {
          that.setData({
            show: true,
            hobby: true
          })
        } else {
          that.setData({
            labelList: attr.concat(list[res.tapIndex])
          })
        }
      }
    })
  },
  // 添加证件照头像、图片分享栏
  selectImage(e) {
    var that = this;
    var type = e.currentTarget.dataset.tag;
    var attr = this.data.attrImg;
    wx.chooseMedia({
      count: type == '0' ? 1 : 6,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success(res) {
        if (type == '0') {
          that.setData({
            'tempList.avatarTemp': res.tempFiles[0].tempFilePath
          })
        } else {
          var str = [];
          var list = res.tempFiles;
          for (var i = 0; i < list.length; i++) {
            str.push(list[i].tempFilePath);
          }
          that.setData({
            attrImg: attr.concat(str)
          })
        }
      }
    })
  },
  // 长按删除图片
  longtapDeleteImg(e) {
    let that = this;
    let tag = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除该图片吗？',
      complete: (res) => {
        if (res.confirm) {
          var list = that.data.attrImg;
          list.splice(tag, 1);
          that.setData({
            attrImg: list
          })
        }
      }
    })
  },
  // 图片查看
  previewClick(e) {
    let path = e.currentTarget.dataset.url;
    wx.previewImage({
      current: path, // 当前显示图片的http链接
      urls: this.data.attrImg // 需要预览的图片http链接列表
    })
  },
  // 兴趣爱好输入监听
  inputHobbyClick(e) {
    this.setData({
      hobbyVal: e.detail.value
    })
  },
  // 昵称姓名输入监听
  inputNick(e) {
    this.setData({
      'tempList.nameTemp': e.detail.value
    })
  },
  // 联系电话输入监听
  inputPhone(e) {
    this.setData({
      'tempList.phoneTemp': e.detail.value
    })
  },
  // 长按删除兴趣爱好标签
  longtapDeleteLabel(e) {
    let that = this;
    let tag = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除该爱好标签吗？',
      complete: (res) => {
        if (res.confirm) {
          var list = that.data.labelList;
          list.splice(tag, 1);
          that.setData({
            labelList: list
          })
        }
      }
    })
  },
  // 取消监听
  cancelMask() {
    this.setData({
      show: false,
      hobbyVal: '',
      'tempList.avatarTemp': this.data.avatar,
      'tempList.nameTemp': this.data.nickName,
      'tempList.phoneTemp': this.data.phone
    })
  },
  // 确定监听
  defineMask() {
    if (this.data.hobby) {
      if (this.data.hobbyVal == '') {
        wx.showToast({
          title: '兴趣爱好不能为空哦',
          icon: 'none'
        })
      } else {
        var attr = this.data.labelList;
        this.setData({
          show: false,
          hobbyVal: '',
          labelList: attr.concat(this.data.hobbyVal)
        })
      }
    } else {
      this.setData({
        show: false,
        avatar: this.data.tempList.avatarTemp,
        nickName: this.data.tempList.nameTemp,
        phone: this.data.tempList.phoneTemp
      })
    }
  },
  // 提交
  formSubmit(e) {
    let params = e.detail.value;
    params.avatar = this.data.avatar;
    params.nickName = this.data.nickName;
    params.phone = this.data.phone;
    params.sex = this.data.arraySex[this.data.indexSex];
    params.certificateImg = this.data.attrImg;
    params.hobbyList = this.data.labelList;
    console.log('获取提交的参数信息', params)
    wx.showToast({
      title: '提交成功',
    })
  },
})
