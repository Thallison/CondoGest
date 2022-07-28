import React from 'react'
import MenuItem from './MenuItem'
import MenuTree from './MenuTree'

export default props => (
        <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <MenuItem path='#/app' label='Dashboard' icon='tachometer-alt' />
            <MenuTree label='Vistoria' icon='clipboard-list' permission={['Administrador']}>
                <MenuItem path='#app/vistorias' label='Consultar Vistoria' icon='clipboard-list' permission={['Administrador']}/>
                <MenuItem path='#app/vistorias/add' label='Adicionar Vistoria' icon='plus' permission={['Administrador']}/>
            </MenuTree>
            <MenuTree label='Normas' icon='file-alt' permission={['Administrador']}>
                <MenuItem path='#app/normas' label='Consultar Normas' icon='paste' permission={['Administrador']}/>
                <MenuItem path='#app/normas/add' label='Adicionar Norma' icon='plus' permission={['Administrador']}/>
            </MenuTree>
            <MenuTree label='Empresas' icon='industry' permission={['Administrador']}>
                <MenuItem path='#app/empresas' label='Consultar Empresas' icon='industry' permission={['Administrador']}/>
                <MenuItem path='#app/empresas/add' label='Adicionar Empresa' icon='plus' permission={['Administrador']}/>
                <MenuItem path='#app/setores' label='Setores' icon='layer-group' permission='sectors' />
            </MenuTree>
            <MenuTree label='Usuários' icon='users' permission={['Administrador']}>
                <MenuItem path='#app/usuarios' label='Consultar Usuários' icon='address-card' permission={['Administrador']}/>
                <MenuItem path='#app/usuarios/add' label='Adicionar Usuário' icon='user-plus' permission={['Administrador']} />
                <MenuItem path='#app/permissoes' label='Permissões' icon='user-shield' permission={['Administrador']} />
            </MenuTree>
            <MenuTree label='Relatórios' icon='chart-pie' permission={['Administrador']}>
                <MenuItem path='#app/relatorios/ultimas_vistorias' label='Status Últimas Vistorias' icon='chart-bar' permission={['Administrador']}/>
            </MenuTree>
        </ul>
        </nav>
)