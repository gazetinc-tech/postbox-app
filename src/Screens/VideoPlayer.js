import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Image, View, TouchableOpacity, Text, Modal } from 'react-native'
import Video from 'react-native-video';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// import Slider from 'react-native-slider';
// import { commonCSS } from '../../commonCSS/GlobalCss';
// import FontSize from '../../commonCSS/FontSize';
// import { Colors } from '../../commonCSS/Colors';
// import ImageComponent from './ImageComponent';
// import { Images } from '../../assets';

const VideoPlayer = ({ isControlVisible, url, isPlaying, onPlay, height, width }) => {
    const [visible, setVisible] = useState(false);
    const [isPaused, setIsPaused] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isMute, setIsMute] = useState(false);
    const [source, setSource] = useState('');
    const [currentDuration, setcurrentDuration] = useState(0)
    const [duration, setDuration] = useState(0.1) // provideing 0 will crash app 
    const [isDurationBarVisible, setDurationBarVisible] = useState(true);

    const [isFullscreen, setIsFullscreen] = useState(false)

    const videoRef = useRef(null);
    const videoRef2 = useRef(null);

    const onPlayClick = () => {
        setIsPaused(!isPaused)
        onPlay()
    }

    const onEnd = () => {
        videoRef?.current?.seek(0)
        videoRef2?.current?.seek(0)
        setIsPaused(true)
    }

    const onLoad = (e: any) => {
        setDuration(e.duration)
    }

    const onProgress = (e: any) => {
        setcurrentDuration(e.currentTime)
    }

    const onBackward = () => {
        if (isPlaying) {
            if (videoRef && videoRef?.current) {
                try {
                    videoRef?.current?.seek(currentDuration - 5)
                } catch (error) {
                    console.log('# UNABLE TO BACKWARD', error)
                }
            }
        }
    }

    const onForward = () => {
        if (isPlaying) {
            if (videoRef && videoRef?.current) {
                try {
                    videoRef?.current?.seek(currentDuration + 5)
                } catch (error) {
                    console.log('# UNABLE TO FORWARD', error)
                }
            }
        }
    }

    const onFullScreen = () => {
        setIsPaused(!isPaused)
        setVisible(!visible)
    }

    useEffect(() => {
        if (url !== undefined) {
            var videoUrl = url.split(" ").join("%20")
            setSource(videoUrl);
        }
    }, [url])

    function secondsToTime(seconds: number) {
        if (isNaN(seconds) || seconds < 0) {
            return "Invalid input";
        }
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.round(seconds % 60);
        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        } else {
            return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        }
    }
    
    return (
        <View style={[s.mainContainer,{height:hp(height), width:width}]}>
        {url !== null && url !== undefined &&
        <>
                <Video
                    ref={videoRef}
                    source={{ uri: `${url.split(" ").join("%20")}` }}
                    resizeMode='contain'
                    onBuffer={() => { }}
                    onError={() => { }}
                    style={{height:hp(height), width:width, alignItems:'center', justifyContent: 'center'}}
                    paused={isPaused || !isPlaying}
                    onEnd={onEnd}
                    onLoad={async (e: any) => [setDuration(e.duration), setIsPaused(false)]}
                    onProgress={onProgress}
                    muted={isMute}
                    // bufferConfig={{
                    //     minBufferMs: 15000,
                    //     maxBufferMs: 50000,
                    //     bufferForPlaybackMs: 2500,
                    //     bufferForPlaybackAfterRebufferMs: 5000
                    // }}
                />        
                <View style={{ alignItems:'center', justifyContent:'center' }}>
                        <View style={s.controllerx}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={s.imgBtn}
                                onPress={onPlayClick}
                                >
                                <Image
                                    resizeMode='contain'
                                    style={s.img}
                                    source={isPaused || !isPlaying ? require('../image/ss_play.png') : require('../image/ss_pause.png')}
                                    />
                            </TouchableOpacity>
                        </View>
                </View>   
            </>
            }
        </View>
    )
}

export default VideoPlayer;

const s = StyleSheet.create({
    controller: {
        position: 'absolute',
        bottom: 0,
    },
    controllerx: {
        position: 'absolute',
        bottom:hp(8),
    },
    modalContainer: {
        transform: [{ rotate: '90deg' }],
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videox: {
        // backgroundColor: Colors.black,
        width: hp(100),
        height: wp(100)
    },

    mainContainer: {
        // width: hp(10),
        // height: hp(10),
        // borderRadius: wp(4),
        backgroundColor: 'black',
        alignItems:'center', justifyContent: 'center',
        // alignSelf: 'center',
        // marginVertical: hp(1),
        // overflow: 'hidden'
    },
    video: {
        width: hp(10),
        height: hp(10),
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        width: hp(40),
        borderRadius: wp(2),
        justifyContent: 'space-between',
        height: hp('5%'),
    },
    imgBtn: {
        height: hp(5),
        width: hp(5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        height: hp(2.5),
        width: hp(2.5)
    },
    duration: {
        fontWeight: '700',
        // fontSize: FontSize.fs11,
        color: '#fff'
    },
    track: {
        height: hp(1.2),
        borderRadius: 5,
        backgroundColor: '#C4C4C4',
        // width: wp(50)
    },
    thumb: {
        width: wp(5),
        height: wp(5),
        borderRadius: 15,
        backgroundColor: '#545455',
    }
})


// <Modal visible={visible} transparent={true} animationType="slide"
// style={{
//     backgroundColor: Colors.black,
//     alignItems: 'center',
//     justifyContent: 'center'
// }}>
// <View style={s.modalContainer}>
//     <Video
//         source={{ uri: source }}
//         resizeMode="contain"
//         style={s.videox}
//         fullscreen={true}
//         fullscreenOrientation='landscape'
//         paused={isPaused || !isPlaying}
//         ref={videoRef}
//         muted={isMute}

//         controls={true}
//         // onProgress={onProgress}
//         onLoad={async () => {
//             // 

//             videoRef?.current?.seek(currentDuration); setIsPaused(false)
//         }}
//         onEnd={onEnd}
//         onBuffer={() => { }}
//         onError={() => { }}
//     />



//     <View style={{
//         // ...commonCSS.fdralic,
//         backgroundColor: '000000aa',
//         width: hp(92),
//         // height:wp(10),
//         bottom: hp(28),
//         position: 'absolute',
//         justifyContent: 'space-between',
//     }}>
//         {/* 2nd row */}
//         <View style={[s.controls, { width: hp(92) }]}>
//             <View style={{ ...commonCSS.fdralic }}>
//                 <Text style={s.duration}>
//                     {secondsToTime(currentDuration)}
//                 </Text>
//                 <TouchableOpacity
//                     activeOpacity={1}
//                     style={s.imgBtn}
//                     onPress={() => setIsMute(!isMute)}
//                 >
//                     <Image
//                         resizeMode='contain'
//                         style={s.img}
//                         source={isMute ? require('../../assets/video/ss_mute.png') : require('../../assets/video/ss_sound.png')}
//                     />
//                 </TouchableOpacity>
//             </View>


//             <View style={{ ...commonCSS.fdralic }}>
//                 {/* <TouchableOpacity
//                     activeOpacity={1}
//                     style={s.imgBtn}
//                     onPress={onBackward}
//                 >
//                     <Image
//                         resizeMode='contain'
//                         style={s.img}
//                         source={require('../../assets/video/ss_backward.png')}
//                     />
//                 </TouchableOpacity> */}

//                 <TouchableOpacity
//                     activeOpacity={1}
//                     style={s.imgBtn}
//                     onPress={onPlayClick}
//                 >
//                     <Image
//                         resizeMode='contain'
//                         style={s.img}
//                         source={isPaused || !isPlaying ? require('../../assets/video/ss_play.png') : require('../../assets/video/ss_pause.png')}
//                     />
//                 </TouchableOpacity>

//                 {/* <TouchableOpacity
//                     activeOpacity={1}
//                     style={s.imgBtn}
//                     onPress={onForward}
//                 >
//                     <Image
//                         resizeMode='contain'
//                         style={s.img}
//                         source={require('../../assets/video/ss_forward.png')}
//                     />
//                 </TouchableOpacity> */}
//             </View>

//             <View style={{ ...commonCSS.fdralic }}>
//                 <Text style={s.duration}>
//                     {secondsToTime(duration)}
//                 </Text>
//                 <TouchableOpacity
//                     activeOpacity={1}
//                     style={s.imgBtn}
//                     onPress={() => { setVisible(false) }}
//                 >
//                     <ImageComponent source={Images.fullScreen} height={2} width={hp(2)} mode={'contain'} />
//                 </TouchableOpacity>

//             </View>
//         </View>
//     </View>
// </View>
// </Modal>





// {isControlVisible === false ?
//   <View style={{ alignItems:'center', justifyContent:'center' }}>
//       <View style={s.controllerx}>
//           <TouchableOpacity
//               activeOpacity={1}
//               style={s.imgBtn}
//               onPress={onPlayClick}
//           >
//               <Image
//                   resizeMode='contain'
//                   style={s.img}
//                   source={isPaused || !isPlaying ? require('../../assets/video/ss_play.png') : require('../../assets/video/ss_pause.png')}
//               />
//           </TouchableOpacity>
//       </View>
//   </View>
//   :
//   <View style={{ ...commonCSS.alicjc, }}>
//       <View style={s.controller}>
//           <View style={{ ...commonCSS.fdralic }}>
//               <Text style={s.duration}>{secondsToTime(currentDuration)}</Text>

//               {/* <Slider
//                   value={currentDuration / duration}
//                   trackStyle={s.track}
//                   thumbStyle={s.thumb}
//                   minimumTrackTintColor='#545455'
//                   style={{ flex: 1, marginHorizontal: wp(2) }}
//                   disabled={false}
//                   onValueChange={async (value: any) => {
//                       setIsPaused(true);
//                       setcurrentDuration(duration * value);
//                       videoRef?.current?.seek(duration * value)
//                       setIsPaused(false)
//                   }}
//               /> */}
//               <Text style={s.duration}>{secondsToTime(duration)}</Text>
//           </View>



//           <View style={s.controls}>

//               <TouchableOpacity
//                   activeOpacity={1}
//                   style={s.imgBtn}
//                   onPress={() => setIsMute(!isMute)}
//               >
//                   <Image
//                       resizeMode='contain'
//                       style={s.img}
//                       source={isMute ? require('../../assets/video/ss_mute.png') : require('../../assets/video/ss_sound.png')}
//                   />
//               </TouchableOpacity>


//               <View style={{ ...commonCSS.fdralic }}>
//                   <TouchableOpacity
//                       activeOpacity={1}
//                       style={s.imgBtn}
//                       onPress={onBackward}
//                   >
//                       <Image
//                           resizeMode='contain'
//                           style={s.img}
//                           source={require('../../assets/video/ss_backward.png')}
//                       />
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                       activeOpacity={1}
//                       style={s.imgBtn}
//                       onPress={onPlayClick}
//                   >
//                       <Image
//                           resizeMode='contain'
//                           style={s.img}
//                           source={isPaused || !isPlaying ? require('../../assets/video/ss_play.png') : require('../../assets/video/ss_pause.png')}
//                       />
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                       activeOpacity={1}
//                       style={s.imgBtn}
//                       onPress={onForward}
//                   >
//                       <Image
//                           resizeMode='contain'
//                           style={s.img}
//                           source={require('../../assets/video/ss_forward.png')}
//                       />
//                   </TouchableOpacity>
//               </View>

//               <TouchableOpacity
//                   activeOpacity={1}
//                   style={s.imgBtn}
//                   onPress={onFullScreen}
//               >
//                   <Image
//                       resizeMode='contain'
//                       style={s.img}
//                       source={require('../../assets/video/ss_full_screen.png')}
//                   />
//               </TouchableOpacity>
//           </View>
//       </View>
//   </View>
// }