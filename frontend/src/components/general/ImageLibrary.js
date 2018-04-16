import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import SaveCancelButtons from '../general/SaveCancelButtons'
import Select from 'react-select'
import lang from '../../utils/i18n'
import Dropzone from 'react-dropzone'
import classnames from 'classnames'
import {imagePath} from '../../utils/constants'
import Modal from '../general/Modal'
import _ from 'lodash'
import { Player } from 'video-react'

class ImageLibrary extends Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            active: false,
            selectedImage: '',
        }

        this.fileUpdateDebounced = _.debounce(this.props.actions.fileUpdate, 200, {
            'leading': false,
            'trailing': true
        })
    }

    onDropPicture(files) {
        const {actions} = this.props

        let validSize = files.filter(file => file.size > 10000000) //10mb
        if (validSize.length) {
            alert(lang.t('imageTooBig') + ' 10MB.')
            return;
        }

        files.forEach(file => {
            actions.uploadFile({file: file, type: "postPhoto"})
                .then(fileUpl => {
                    this.setState({selectedImage: fileUpl.id})
                }).catch(err => console.log(err))
        })

    }

    validateForm(){

        return this.state.selectedImage !== ''
    }
    
    isSVG(file) {

        if (file) {
            let extension = file.split('.').pop().toLowerCase()
            if (extension === 'svg/' || extension === 'svg') {
                return true
            }
        }
        return false
    }

    renderImagePlaceholder(){

        const {fileList, currentImage} = this.props

        let image = fileList.find(file => file.id === currentImage)
        if(!image) image = {}
        
        let src = this.isSVG(image.src) ? image.src : image.src +'900/300'
        
        let placeholderStyle = {
            background: 'url('+ src +') no-repeat center center',
            backgroundSize: 'cover',
        }

        return (

            <div className="placeholder" style={placeholderStyle} onClick={() => this.setState({active: true})}>
                <div className="button secondary changePhoto">
                    {image ? lang.t('Change photo') : lang.t('Add photo')}
                </div>
            </div>

        )
    }

    renderVideoPlaceholder(){
        const {fileList, currentImage} = this.props

        let videoFile = fileList.find(file => file.id === currentImage)
        if(!videoFile) videoFile = {}

        let src = ''
        let placeholderStyle = {
            background: 'url('+ src +') no-repeat center center',
            backgroundSize: 'cover',
        }

        return (

            <div className="videoPlaceholder" style={placeholderStyle}>
                <div className="button secondary changeVideo" onClick={() => this.setState({active: true})}>
                    {videoFile ? lang.t('Change video') : lang.t('Add video')}
                </div>
                <Player>
                    <source src={videoFile.src} />
                </Player>
            </div>

        )
    }

    saveFunction(){

        const {saveFunction, fileList} = this.props

        if (!this.validateForm()) return

        let fileObj = fileList.find(el => el.id === this.state.selectedImage)

        let image = {
            src:   ENV.imagePath + fileObj.name + '/',
            title: fileObj.title,
            alt:   fileObj.alt,
            id:    fileObj.id
        }

        saveFunction(image)
        this.setState({active:false, selectedImage: ''})
    }

    handleDelete(id){
        const {actions, fileList} = this.props

        let file = fileList.find(el => el.id === this.state.selectedImage)

        let text = <div> {lang.t("You are about to delete") + ' ' + lang.t("file") + ':'}
                         <div className="bold">{file.name}</div>
                    </div>

        this.refs.modal.setState({
            open:true,
            heading: lang.t("Really delete ?"),
            text: text,
            confirmFunction: () => {
                actions.deleteFile(id)
                this.setState({selectedImage: ''})
            }
        })

    }

    changeFileProp(prop, val){
        const {actions, fileList} = this.props

        let file = fileList.find(el => el.id === this.state.selectedImage)

        let newFile = Object.assign({}, file, {[prop]:val})

        actions.fileUpdateLocal(newFile)
        this.fileUpdateDebounced(newFile)
    }

    renderLibraryForm(){

        const {fileList, videoMode} = this.props

        let activeFile = fileList.find(el => el.id === this.state.selectedImage)
        if (!activeFile) activeFile = {}
        let allImagesClass = classnames('allImages', {
            fullWidth: !this.state.selectedImage
        })

        let acceptType = videoMode ? "video/*" : "image/*"

        let videoFormats = ['mkv', 'webm', 'flv', 'avi', 'wmv', 'mov', 'mp4', 'm4v', 'mpg', 'mpeg']
        let fileListFiltered = fileList.filter(f => {
            let ext = f.name.split('.').pop()
            if (videoMode && videoFormats.indexOf(ext) > -1) return true
            if (!videoMode && videoFormats.indexOf(ext) === -1) return true
        })

        return (
            <div className="formWrap">

            <div className="libraryForm">
                <h1>{lang.t('Image Library')}</h1>

                <div className="partitions">

                    <div className="imageBlock">
                        <div className={allImagesClass}>
                            {fileListFiltered.map((file, i) => {

                                let imgClass = classnames('imageFile', {
                                    active: file.id === this.state.selectedImage
                                })

                                let src = this.isSVG(file.src) ? file.src : file.src+'100/100'

                                return <div
                                    key={i}
                                    className={imgClass}
                                    onClick={() => this.setState({selectedImage: file.id})}
                                    onDoubleClick={() => {
                                        this.setState({selectedImage: file.id})
                                        this.saveFunction()
                                    }}
                                >
                                        {videoMode ? <Player><source src={file.src} /></Player> : <img src={src}/>}
                                </div>
                            })}
                        </div>
                    </div>

                    {this.state.selectedImage &&
                    <div className="imgAttributes">
                        <div className="inputGroup">
                            <label className="small">{lang.t('Image title')}</label>
                            <input
                                className="small"
                                type="text"
                                value={activeFile.title}
                                onChange={(e) => {
                                    this.changeFileProp('title', e.target.value)
                                }}
                            />
                        </div>
                        <div className="spacer"/>
                        <div className="inputGroup">
                            <label className="small">{lang.t('Image alt')}</label>
                            <input
                                className="small"
                                type="text"
                                value={activeFile.alt}
                                onChange={(e) => {
                                    this.changeFileProp('alt', e.target.value)
                                }}
                            />
                        </div>
                        <div
                            className="button small secondary deleteImageButton"
                            onClick={() => {
                                this.handleDelete(this.state.selectedImage)
                            }}
                        >
                            {lang.t("Delete Image")}
                        </div>
                        <div className="imageFilename">{activeFile.name}</div>
                    </div>
                    }

                    <div className="uploadNew">

                        <Dropzone
                            className="dropzone"
                            onDrop={this.onDropPicture.bind(this)}
                            accept={acceptType}
                            //maxSize = {10000}
                            multiple={true}
                        >
                            <div className="button secondary">
                                {lang.t('Upload new image')}
                            </div>
                        </Dropzone>
                    </div>

                </div>

                <SaveCancelButtons
                    validateFunction = {() => this.validateForm()}
                    cancelFunction = {() => this.setState({active:false})}
                    saveFunction = {() => this.saveFunction()}
                />

            </div>

            <Modal ref = "modal" />

            <div className="shade" onClick = {()=>this.setState({active:false})}></div>

        </div>
        )
    }

    render() {

        const {videoMode} = this.props

        let imgLibClass = classnames("imageLibrary", {smallFormat: this.props.smallFormat})

        return(
            <div className={imgLibClass}>
                {this.state.active ? this.renderLibraryForm() :
                    videoMode ? this.renderVideoPlaceholder() :this.renderImagePlaceholder()}
            </div>
        )
    }

}

function mapStateToProps(state) {

    const { fileList } = state.files

    return {
        fileList
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageLibrary)
