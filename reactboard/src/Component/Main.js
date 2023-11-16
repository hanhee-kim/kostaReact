import { UncontrolledCarousel } from "reactstrap";

const Main=()=> {
    const items = [
        {
            src:'/img/dog1.jpg',
            altText:'강아지1',
            caption:'doggy1 caption',
            header:'doggy1'
        },

        {
            src:'/img/dog2.jpg',
            altText:'강아지2',
            caption:'doggy2 caption',
            header:'doggy2'
        },

        {
            src:'/img/dog3.jpg',
            altText:'강아지3',
            caption:'doggy3 caption',
            header:'doggy3'
        }
    ]

    return (
        <div style={{width:"50%", height:"50%", display:"inline-block"}}>
            <UncontrolledCarousel items={items}/>
        </div>
    )
}

export default Main;