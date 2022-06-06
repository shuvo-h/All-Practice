import { Button, Dropdown, DropdownButton } from "react-bootstrap";

const PARAGRAPH_STYLES = ["h1", "h2", "h3", "h4", "paragraph", "multiple"];
const CHARACTER_STYLES = ["bold", "italic", "underline", "code"];

export default function Toolbar({ selection, previousSelection }) {
  return (
    <div className="toolbar">
      {/* Dropdown for paragraph styles */}
      <DropdownButton
        className={"block-style-dropdown"}
        disabled={false}
        id="block-style"
        title={getLabelForBlockStyle("paragraph")}
      >
        {PARAGRAPH_STYLES.map((blockType) => (
          <Dropdown.Item eventKey={blockType} key={blockType}>
            {getLabelForBlockStyle(blockType)} 
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {/* Buttons for character styles */}
      {CHARACTER_STYLES.map((style) => (
        <ToolBarButton
          key={style}
          icon={<i className={`bi ${getIconForButton(style)}`} />}
          isActive={false}
        />
      ))}
    </div>
  );
}

function ToolBarButton(props) {
  const { icon, isActive, ...otherProps } = props;
  return (
    <Button
      variant="outline-primary"
      className="toolbar-btn"
      active={isActive}
      {...otherProps}
    >
      {icon}
    </Button>
  );
}
