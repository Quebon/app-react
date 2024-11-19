import React, { useState, useRef } from "react";
import {
	CloseButton,
	Button,
	OverlayTrigger,
	Tooltip,
	Figure,
	TooltipProps,
	Table,
	Form
} from "react-bootstrap";
import appIcon from './../assets/images/temp_appIcon.png';

export interface FileUploadProps {
	onChange?: (files: Array<File>) => void;
	maxFileSize?: number;
  // need to add optional file description. user may want to add description to go with file.
	value?: Array<File>;
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
	accept?: string;
	maxFileCount?: number;
	imageWidth?:number;
	imageHeight?:number;
	inputName?:String;
}

const FileUpload: React.FunctionComponent<FileUploadProps> = ({
	onChange,
	maxFileSize,
	value,
	accept,
	imageWidth,
	imageHeight,
	maxFileCount,
	inputName
}) => {
  // the list of files to be uploaded
	const [list, setList] = useState(value || []);

	const [imgFile, setImgFile] = useState("");
	const imgRef = useRef();

	const rerender = () => {
		// see https://stackoverflow.com/a/67354136/147530
		// for why we need to use slice
		setList(list.slice());
		// using the pattern here: https://stackoverflow.com/a/70443467/147530
		// it is the simplest thing to do and it works
		onChange && onChange(list);
	};

	const handleUp = (e: any, i: number) => {
		const temp = list[i];
		list[i] = list[i - 1];
		list[i - 1] = temp;
		rerender();
	};

	const handleDown = (e: any, i: number) => {
		const temp = list[i];
		list[i] = list[i + 1];
		list[i + 1] = temp;
		rerender();
	};

	const handleDelete = (e: any, i: number) => {
		list.splice(i, 1);
		rerender();
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let files: FileList | null = e.currentTarget.files;
		if (files) {
			let fo = document.querySelector("[data-id='upfile_1']");
			if(fo) {
				fo.parentNode.removeChild(fo);
			}
			for (var i = 0; i < files.length; i++) {
				setList([]);
				list.push(files[i]);
				console.log(imgRef);
				console.log(imgRef.current.files);
				const file = imgRef.current.files[0];
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onloadend = () => {
					setImgFile(reader.result);
				};				
			}
			rerender();
		}
	};

  // https://www.pluralsight.com/guides/how-to-display-tooltip-in-react-bootstrap
	const renderTooltip = (
		props: JSX.IntrinsicAttributes &
			TooltipProps &
			React.RefAttributes<HTMLDivElement>
	) => <Tooltip {...props}>File exceeds maximum allowable size</Tooltip>;

	const validate = (file: File) => {
		// see https://www.toptal.com/designers/htmlarrows/arrows/ for unicode for html symbols
		if (maxFileSize && maxFileSize > 0 && file.size > maxFileSize) {
			return (
				<OverlayTrigger placement="top" overlay={renderTooltip}>
					<span>{String.fromCharCode(9888)}</span>
				</OverlayTrigger>
			);
		}
	};

  // https://stackoverflow.com/a/49482317/147530
  // this method converts the list into an HTML table
  // for rendering
	const getTableBodyAsReactElement = () => {
		if (list) {
			return (
				<>
				{list.map((item, i) => {

					// the keys are there to take care of react warning otherwise
						return (
							<figure className="figure" key={i} data-id="upfile_1">
								<img width={imageWidth>0?imageWidth:80} height={imageHeight>0?imageHeight:80} src={imgFile?imgFile:null}/>
							</figure>
						);
					})}
				</>
			);
		}
	};

	const renderFileInput = () => {
		if (!(maxFileCount > 0) || list.length < maxFileCount) {
			return (
				<Form.Control type="file" name={inputName != ""?inputName:"upFile"} id={inputName != ""?inputName:"upFile"} onChange={handleOnChange} accept={accept} className="hide" ref={imgRef}/>
			);
		}
	};

  // the render method should render the list of files
  // and display a button to choose more files
return (
    <>
		{renderFileInput()}
		{getTableBodyAsReactElement()}
    </>
	);
};

export default FileUpload;
