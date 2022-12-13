import React, { useState, useRef, useContext } from 'react'
import { AppContext } from 'components/ContextApi';
import { Card, Table, Select, Input, Button, Badge, Menu, Modal, Form, message } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'
import { useEffect } from 'react';
import { createGST, getGST,deleteGst, updateGST } from 'utils/api/gst';
import { getAccountUnderGroup, createAccountUnderGroup, updateAccountUnderGroup, deleteAccountUnderGroup } from 'utils/api/accountUnderGroup';

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const AccountUnderGroup = () => {
	const {showTitle}=useContext(AppContext)
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [selectedId, setSelectedId] = useState("")
	const [list, setList] = useState(ProductListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [gstList, setGstList] = useState([])
	const [initialLoading, setInitialLoading]=useState(false)
	const [openDeleteModal, setOpenDeleteModal] = useState({
		open: false,
		id: '',
		name: ''
	})
	const addButtonRef = useRef(null)
const formInputRef = useRef(null)

	const showModal = () => {
		setIsModalOpen(true);
	};
	const showEditModal = (row) => {
		setIsModalOpen(true);
		setIsEdit(true);
		setSelectedId(row.id)
		form.setFieldsValue({
			detail: row.detail,
			name: row.name
		})
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setIsEdit(false);
		setSelectedId("")
		form.resetFields();
	};
	
	function handleEnter(event) {
        const form = event?.target?.form;
        
        const index = Array.prototype.indexOf.call(form, event.target);
        if (event.keyCode === 13) {
            if ((index + 1) < form.elements.length) {
                form.elements[index + 1]?.focus();
            }
            event.preventDefault();
        } else if (event.keyCode === 27) {
            if ((index - 1) > 0) {
                form.elements[index - 1]?.focus();
            }
            event.preventDefault();
        }
    }
	
	const [form] = Form.useForm()
	const onFinish = async (values) => {
		try {
			const { name, detail } = values;
		setSubmitLoading(true)
		if(isEdit && selectedId) {
			const response = await updateAccountUnderGroup(selectedId, name, detail);
			if (response.success === true) {
				message.success(response.message)
			}
		} else {
			const response = await createAccountUnderGroup(name, detail);
			if (response.success === true) {
				message.success(response.message)
			}
		}
		setSubmitLoading(false)
		init()
		setIsModalOpen(false);
		setIsEdit(false);
		setSelectedId("")
		form.resetFields();
		} catch (error) {
			message.error(message)
		}

	};

	const onFinishFailed = errorInfo => {
		// console.log('Failed:', errorInfo);
	};

	async function init() {
		try {
			setInitialLoading(true)
		const response = await getAccountUnderGroup();
		if (response.data?.length) {
			setGstList(response.data)
			setIsModalOpen(false);
			// message.success(response.message)
		} else {
			setGstList([])
		}
		setInitialLoading(false)
		} catch (error) {
			message.error(message)
		}
	}

	useEffect(() => {
		if(!isModalOpen) {
			addButtonRef?.current?.focus()
		} else {
			formInputRef?.current?.focus()
		}
	},[isModalOpen])
	useEffect(() => {

		init()
	}, [])

	const dropdownMenu = row => (

		<Menu>
			<Menu.Item onClick={() => showEditModal(row)}>
				<Flex alignItems="center">
					<EditOutlined />
					<span className="ml-2">Edit</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => setOpenDeleteModal({ open: true, id: row.id, name: row.name })}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);

	// delete gst***********
	const deleteRow = async (id) => {
		if(!id) return;
		setSubmitLoading(true)
		const response = await deleteAccountUnderGroup(id)
		setSubmitLoading(false)
		init()
		if (response.success === true) {
			message.success(response.message)
			init()
		}
		setOpenDeleteModal({
			open: false,
			id: '',
			name: ''
		})
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id'
		},
		{
			title: 'Account Group',
			dataIndex: 'acountUnderGroup',
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.name}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Detail',

			dataIndex: 'detail',
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.detail}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},

		{
			title: 'Created Date',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.created_at}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Updated Date',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					{/* <AvatarStatus size={60} type="square" src={record.image} name={record.name}  /> */}
					{/* <AvatarStatus size={60} type="square"name={record.name}  /> */}
					{record.updated_at}
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},

		{
			title: 'Action',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)} />
				</div>
			)
		}
	];

	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value ? list : ProductListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	const handleShowCategory = value => {
		if (value !== 'All') {
			const key = 'category'
			const data = utils.filterArray(ProductListData, key, value)
			setList(data)
		} else {
			setList(ProductListData)
		}
	}

	return (
		<>
			<Card>
				<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)} />
						</div>
					</Flex>
					<div>
						<Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />} block autoFocus ref={addButtonRef }> Account Group</Button>
					</div>
				</Flex>
				<div className="table-responsive">
					<Table
						columns={tableColumns}
						dataSource={gstList}
						rowKey='id'
						rowSelection={{
							selectedRowKeys: selectedRowKeys,
							type: 'checkbox',
							preserveSelectedRowKeys: false,
							...rowSelection,
						}}
						loading={initialLoading}
					/>
				</div>
			</Card>

			<Modal

				title={isEdit ? "Edit Account" : "Add Account"} open={isModalOpen} onCancel={handleCancel} footer={[]}>
				<Form
					form={form}
					style={{ width: showTitle ? '85%' : '100%' }}
					{...layout}
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>

					<Form.Item
					onKeyDown={handleEnter}
						className={`${showTitle ? '' : 'hide-label'}`}
						label="Account group"
						name="name"
						rules={[{ required: true, message: ' Account group is required!' }]}
					>
						<Input  placeholder='Account group' autoFocus ref={formInputRef }/>
					</Form.Item>

					<Form.Item
					onKeyDown={handleEnter}
						className={`${showTitle ? '' : 'hide-label'}`}
						label="Detail"
						name="detail"
						rules={[{ required: true, message: 'Detail is required' }]}
					>
						<Input placeholder='Detail'/>
					</Form.Item>



					<Form.Item {...tailLayout}  >

						<div style={{
								width: 'fit-content',
								display: "flex",
								justifyContent: "center"
							   }}>
						<Button type="primary" htmlType="submit" loading={submitLoading}>
							{isEdit ? "Save" : "Submit"}
						</Button>
						<Button type="primary" onClick={handleCancel} style={{ marginLeft: '20px' }}	>
							Cancel
						</Button>
					</div>

					</Form.Item>

				</Form>
			</Modal>
			{/* Delete confirmation popup */}
			<Modal
				title={"Delete Accounting Under Group"}
				open={openDeleteModal.open}
				onCancel={() => setOpenDeleteModal({
					open: false,
					id: '',
					name: ''
				})}
				footer={[
					<Button 
						type="primary" 
						loading={submitLoading} 
						htmlType="submit"
						onClick={() => deleteRow(openDeleteModal.id)}
					>
						Delete
					</Button>,
					<Button type="primary" onClick={() => setOpenDeleteModal({
							open: false,
							id: '',
							name: ''
						})}
					>
						Cancel
					</Button>
				]}
			>
				<div>
					<h2>{`Are you sure you want to delete ${openDeleteModal.name} Accounting Under Group?`}</h2>
				</div>
			</Modal>
		</>
	)
}

export default AccountUnderGroup