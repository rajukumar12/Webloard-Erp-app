import React, { useState, useRef } from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu, Modal, Form, message } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import utils from 'utils'
import { useEffect } from 'react';
import { createGST, getGST, deleteGst, updateGST } from 'utils/api/gst'; 

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};


const GroupCreation = () => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [selectedId, setSelectedId] = useState("")
	const [list, setList] = useState(ProductListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const [groupcreationList, setGroupCreationList] = useState([]);
	const [initialLoading, setInitialLoading] = useState(false)
	const [openDeleteModal, setOpenDeleteModal] = useState({
		open: false,
		id: '',
		name: ''
	})
	const refs = useRef(null);
	const showModal = () => {
		setIsModalOpen(true);
		refs.current.focus();
	};
	const showEditModal = (row) => {
		setIsModalOpen(true);
		setIsEdit(true);
		setSelectedId(row.id)
		form.setFieldsValue({
			percent: row.percent,
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
        console.log(event?.key, 'key===')
        const index = Array.prototype.indexOf.call(form, event.target);
        if (event.keyCode === 13) {
            if ((index + 1) < form.elements.length) {
                form.elements[index + 1]?.focus();
				event.preventDefault();
            }
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
			const { name, percent } = values;
			setSubmitLoading(true)
			if (isEdit && selectedId) {
				const response = await updateGST(selectedId, name, percent);
				if (response.success === true) {
					message.success(response.message)
				}
			} else {
				const response = await createGST(name, percent);
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
			submitLoading(false)
			return
		}
	};

	const onFinishFailed = errorInfo => {
		// console.log('Failed:', errorInfo);
	};

	async function init() {
		try {
			setInitialLoading(true)
			const response = await getGST();
			if (response.data?.length) {
				setGroupCreationList(response.data)
				setIsModalOpen(false);
				// message.success(response.message)
			} else {
				setGroupCreationList([])
			}
			setInitialLoading(false)
		} catch (error) {
			message.error(message)
			setInitialLoading(false)
		}
	}

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

	const deleteRow = async (id) => {
		if (!id) return;
		setSubmitLoading(true)
		const response = await deleteGst(id)
		setSubmitLoading(false)
		init()
		if (response?.success === true) {
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
			title: 'Group Name',
			dataIndex: 'name',
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
			title: 'Details',
			dataIndex: 'percent',
			render: percent => (
				<div>
					{percent}

				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
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
						{/* <div className="mb-3">
							<Select
								defaultValue="All"
								className="w-100"
								style={{ minWidth: 180 }}
								onChange={handleShowCategory}
								placeholder="Category"
							>
								<Option value="All">All</Option>
								{
									categories.map(elm => (
										<Option key={elm} value={elm}>{elm}</Option>
									))
								}
							</Select>
						</div> */}
					</Flex>
					<div>
						<Button onClick={showModal} type="primary" icon={<PlusCircleOutlined />} block>Group create</Button>
					</div>
				</Flex>
				<div className="table-responsive">
					<Table
						columns={tableColumns}
						dataSource={groupcreationList}
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
				title={isEdit ? "Edit Group create" : "Group create"} open={isModalOpen} onCancel={handleCancel} footer={[]}>
				<Form
					form={form}
					style={{ width: '85%' }}
					// style={{boxShadow: '2px 5px 15px -10px rgb(0,0,0,0.5)',  padding:'10px', width:'50%'}}
					{...layout}
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>

					<Form.Item
						// style={{width:"35%"}}
						label="Group Name"
						name="name"
						rules={[{ required: true, message: ' Group create is required!' }]}
						onKeyDown={handleEnter}
						ref={refs}
					>
						<Input  placeholder="Group Name" />
					</Form.Item>

					
					<Form.Item
						// style={{width:"35%"}
						label="Under"
						name="under"
						onKeyDown={handleEnter}
						rules={[{ required: true, message: 'Under is required' }]}
					>
						<Input placeholder="Under"/> 
					</Form.Item>
					<Form.Item
						label="Groups behaves like a sub-ledger"
						name="under"
						onKeyDown={handleEnter}
						rules={[{ required: true, message: 'Groups behaves like a sub-ledger is required' }]}
					>
						<Input placeholder="Groups behaves like a sub-ledger"/>
					</Form.Item>
					<Form.Item
						// style={{width:"35%"}
						label="Nelt Debit/Credit blances for reporting"
						name="under"
						onKeyDown={handleEnter}
						rules={[{ required: true, message: 'Nelt Debit/Credit blances for reporting is required' }]}
					>
						<Input placeholder="Nelt Debit/Credit blances for reporting"/> 
					</Form.Item>
					<Form.Item
						// style={{width:"35%"}
						label="Used for calculation(for exm: taxes,discount"
						name="under"
						onKeyDown={handleEnter}
						rules={[{ required: true, message: 'Used for calculation(for exm: taxes,discount is required' }]}
					>
						<Input placeholder="Used for calculation(for exm: taxes,discount"/> 
					</Form.Item>
					<Form.Item
						// style={{width:"35%"}
						label="Method to allocate when used in purchase invoice"
						name="under"
						onKeyDown={handleEnter}
						rules={[{ required: true, message: 'Method to allocate when used in purchase invoice is required' }]}
					>
						<Input placeholder="Method to allocate when used in purchase invoice"/> 
					</Form.Item>

					<Form.Item
						{...tailLayout}
						style={{
							display: 'flex',
							justifyContent: 'center'
						}}
					>
						<div
							style={{
								width: 'fit-content',
								display: "flex",
								justifyContent: "center"
							}}
						>
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
				title={"Delete Group create"}
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
					<h2>{`Are you sure you want to delete ${openDeleteModal.name} Group create?`}</h2>
				</div>
			</Modal>
		</>
	)
}

export default GroupCreation
