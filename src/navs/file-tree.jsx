import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import intl from "react-intl-universal";
import { nanoid } from 'nanoid';
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
import { MenuIcon } from '../common/icons';
import FileInfoDialog from './file-info-dialog';

function FileTree({ file, index, currentFileIndex, searchValue, changeFileIndex, deleteFile }) {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = currentFileIndex === index;
  if (searchValue && !file.name.includes(searchValue)) {
    return null;
  }

  return (
    <div key={index} className={classnames("navs-body-item d-flex", { active: isActive })}>
      <span
        className="navs-body-item-name text-truncate"
        onClick={() => changeFileIndex(index)}
      >
        {file.name}
      </span>
      <Dropdown isOpen={dropdownOpen} size="sm" toggle={() => setDropdownOpen(!dropdownOpen)}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown" 
          aria-expanded={dropdownOpen}
        >
          <MenuIcon/>
        </DropdownToggle>
        <DropdownMenu className="dtable-dropdown-menu dropdown-menu mr-2">
          <DropdownItem key={nanoid()} onClick={() => setDialogOpen(true)}>{intl.get('Information')}</DropdownItem>
          <DropdownItem key={nanoid()} onClick={() => deleteFile(index)}>{intl.get('Delete')}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {dialogOpen && <FileInfoDialog file={file} toggleDialog={() => setDialogOpen(false)}/>}
    </div>
  );
}

FileTree.propTypes = {
  file: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  deleteFile: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  currentFileIndex: PropTypes.number.isRequired,
  changeFileIndex: PropTypes.func.isRequired,
};

export default FileTree;
