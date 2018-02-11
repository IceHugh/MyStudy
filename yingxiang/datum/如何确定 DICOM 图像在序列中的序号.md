# 如何确定 DICOM 图像在序列中的序号

标签（空格分隔）： 智能医疗

---

一个 DICOM 图像序列中可能包含很多张图像，一张图像对应一个 `.dcm` 文件，通常情况下，医疗影像设备直接产生的 `.dcm` 文件都是单帧图像，也就是一个 `.dcm` 文件中只包含一张图像信息。与之相对的，还存在多帧图像，也就是一个 `.dcm` 文件中包含了多于一张的图像信息，多帧图像通常是对单帧图像的进一步处理得到的，默认情况下，我们只处理单帧图像类型，也就是需要保证能够拿到医疗机构产生的原始 DICOM 文件。

一个 DICOM 图像序列对应患者的一次拍片结果，医生使用 DICOM 阅读器进行阅片时，通常是对一个序列中的图像进行连续的阅读，因此这就涉及到需要对图像进行排序的问题，毕竟阅片本来难度就很高，如果阅读器还把序列中的图像顺序打乱了随机显示出来，那就更没法看了，对于病灶的定位非常不利。那么要根据哪些信息来对一个序列中的图像进行排序呢？文件名？还是 DICOM 标准中的某些标签值？

我们先来看看文件名，医疗设备产生的 DICOM 文件命名应该是没有一个统一的标准的，各个厂商可能有自己的命名方式，例如用哈希值命名等，因此这个不靠谱。那么 DICOM 文件中有哪些标签值可以用来确定图像的序号呢？目前得知的有两个：

| Tag        | VR           | Name  |description|
| ------------- |:-------------:| -----:|-----:|
|(0020,0013)|IS|Instance Number|图像码：辨识图像的号码|
|(0020,0032) |DS|Image Position (Patient)|图像的左上角在空间坐标系中的 x,y,z 坐标,单位是毫米|

其中，VR 表示数据类型：

* IS 表示整型字符串，最多 12 个字符，例如 36。
* DS 表示小数字符串，最多 16 个字符，Image Position(Patient) 的值是一个三维的数组，例如 [-168.681640625, -332.681640625, -92.5]，这里的 DS 类型指的是数组里面的元素类型。

为了有个直观的概念，我们解析一个有拥有 733 张图像的 CT 序列，首先根据文件名顺序解析时，得到的图像排序信息如下：

![MacHi 2017-11-27 17-49-25.png](http://upload-images.jianshu.io/upload_images/191937-3a38ba3eb1738611.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，Instance Number 和 Image Position(Patient) 的取值是乱序的。需要注意的是，在这里 Image Position(Patient) 我们只取 z 分量，x 和 y 分量不包含排序信息。

接着我们按照 InstanceNumber 升序排列，来看看有什么规律，如下图所示：

![MacHi 2017-11-27 17-55-06.png](http://upload-images.jianshu.io/upload_images/191937-37e8d7faefeda113.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

再接着对 Image Position(Patient) 的 z 分量升序排列，如下图所示：

![MacHi 2017-11-27 18-03-24.png](http://upload-images.jianshu.io/upload_images/191937-2e859fa711baa84d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

可以看到，Instance Number 和 Image Position(Patient)的 z 分量都是可以用来确定图像在序列中的序号的，但是 Instance Number 不能保证唯一性，这取决于产出 DICOM 文件的设备。因此保险起见，我们还是使用 Image Position(Patient)的 z 分量来确定图像的序号。

下面是取之 [stackoverflow](https://stackoverflow.com/questions/6597843/dicom-slice-ordering) 上面的一个问答，虽然不是专门针对图像序号的，但相关信息可以参考。

> **Patient Position (0018, 5100)** will tell you if the patient was scanned head-first supine, feet-first prone, head-first prone, etc. **Instance Number (0020, 0013)**, also commonly known as slice number, contains no information about spatial location and isn't even guaranteed to be unique. **Slice Location (0020, 1041)** is useful, if it exists, but you can't count on it always existing because it's a Type 3 (optional) attribute. To have a robust solution, you need to use **Image Position Patient (0020, 0032)** together with **Image Orientation Patient (0020, 0037)** and **Patient Position (0018, 5100)** to properly order the slices in space. Image Position Patient gives you a vector from the origin to the center of the first transmitted pixel of the image. Image Orientation Patient gives you vectors for the orientation of the rows and columns of the image in space. Patient Position tells you how the patient was placed on the table relative to the coordinate system.

最后，我们可以在微云影像提供的[云阅片](http://yunyuepian.weiyunyingxiang.com/login.html)上面验证我们得到的排序结果是否和业界的一致。


