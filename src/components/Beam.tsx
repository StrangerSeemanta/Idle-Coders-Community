import { CSSProperties, Fragment, ReactNode } from 'react'


interface Props {
    children: ReactNode | string;
    css?: CSSProperties;
    anchor?: "center" | "left" | "right" | "top" | "bottom";
    size?: "cover" | "contain";
    repeat?: "repeat-x" | "repeat-y" | "no-repeat" | "repeat"
    fixed?: boolean;
    imgSrc: string;
}
function Beam({ children, size, anchor, repeat, fixed, imgSrc }: Props) {
    return (
        <Fragment>
            <div style={{ background: `url(${imgSrc})`, backgroundPosition: anchor && anchor, backgroundSize: size ? size : "cover", backgroundRepeat: repeat ? repeat : "no-repeat", backgroundAttachment: fixed ? "fixed" : "inherit" }}>

                {children}
            </div>

        </Fragment>
    )
}

export default Beam