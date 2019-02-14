import React, { Component } from 'react'
import { ButtonBase, Typography, withStyles } from '@material-ui/core'
// import { NoteCard, PostForm } from '.'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        border: '1px solid white',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            // '& $imageTitle': {
            //     border: '4px solid currentColor',
            // },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        fontSize: '50px',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
});

const images = [
    {
        url: '/static/images/grid-list/breakfast.jpg',
        title: 'Household',
        width: '33%',
    },
    {
        url: '/static/images/grid-list/burgers.jpg',
        title: 'Eating',
        width: '33%',
    },
    {
        url: '/static/images/grid-list/camera.jpg',
        title: 'Plants',
        width: '33%',
    },
    {
        url: '/static/images/grid-list/camera.jpg',
        title: 'Animals',
        width: '33%',
    },
    {
        url: '/static/images/grid-list/camera.jpg',
        title: 'Office',
        width: '33%',
    },
    {
        url: '/static/images/grid-list/camera.jpg',
        title: 'Entertainment',
        width: '33%',
    },
    {
        url: '/static/images/grid-list/camera.jpg',
        title: 'Family',
        width: '33%',
    },
    {
        url: '/static/images/grid-list/camera.jpg',
        title: 'Transport',
        width: '33%',
    },
    {
        url: '/static/images/grid-list/camera.jpg',
        title: 'Miscellaneous',
        width: '33%',
      },
];

class Receiver extends Component {

    // state = {
    //     notes: [],
    //     page: 1,
    //     alert: false,
    //     alertContent: ''
    // }

    // update = (page, clear) => {
    //     NoteModel.fetch(page)
    //         .then(notes => {
    //             this.setState({
    //                 notes: clear ? notes : [...this.state.notes, ...notes],
    //                 page: page
    //             })
    //         })
    //         .catch(error => {
    //             if (!error.response) {
    //                 this.setState({alert: true, alertContent: '连接失败，服务器已停止运行或 API 服务器地址错误'})
    //             } else if (error.response.status !== 404) {
    //                 this.setState({alert: true, alertContent: error.message})
    //             }
    //         })
    // }

    // bottomEvent = () => {
    //     const el = document.getElementById(this.state.notes.length - 1)
    //     if (el.getBoundingClientRect().bottom <= window.innerHeight) {
    //         this.update(this.state.page + 1)
    //     }
    // }

    // handleAlertClose = () => {
    //     this.setState({alert: false})
    // }

    // componentDidMount() {
    //     this.update(1)
    //     document.addEventListener('scroll', this.bottomEvent)
    // }

    // componentWillMount() {
    //     this.unsubscribe = Store.subscribe(() => {
    //         const save = Store.getState().refresh
    //         if (save) {
    //             this.setState({ notes: []})
    //             this.update(1, true)
    //         }
    //     })
    // }

    // componentWillUnmount() {
    //     this.setState({ notes: [], page: 0 })
    //     document.removeEventListener('scroll', this.bottomEvent)
    //     this.unsubscribe()
    // }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {images.map(image => (
                    <ButtonBase
                        focusRipple
                        key={image.title}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        style={{
                            width: image.width,
                        }}
                    >
                        <span
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                {image.title}
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                ))}
            </div>
        )
    }
}

export default withStyles(styles)(Receiver)
